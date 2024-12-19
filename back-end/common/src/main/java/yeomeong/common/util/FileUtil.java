package yeomeong.common.util;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;
import yeomeong.common.exception.CustomException;
import yeomeong.common.exception.ErrorCode;

@Component
public class FileUtil {

    public static String uploadFileToS3(AmazonS3 s3Client,String bucketName, MultipartFile file) {
        if (file.isEmpty()) {
            throw new CustomException(ErrorCode.EMPTY_FILE);
        }

        String fileName = "";
        try {
            fileName = FileUtil.generateFileName(file);

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(file.getSize());
            metadata.setContentType(file.getContentType());

            s3Client.putObject(new PutObjectRequest(bucketName,
                    fileName, file.getInputStream(), metadata));
        } catch (Exception e) {
            throw new CustomException(ErrorCode.S3_UPLOAD_FAILED);
        }

        return fileName;
    }

    private static String generateFileName(MultipartFile file) {


        String fileExtension = "";
        String originalFileName = file.getOriginalFilename();

        if(originalFileName != null && originalFileName.contains(".")){
            fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
        }

        return UUID.randomUUID() + fileExtension;
    }



    public static String uploadOriginalAndThumbnailToS3(AmazonS3 s3Client, String bucketName, MultipartFile file)  {
        if(file == null) return null;

        String fileName = uploadFileToS3(s3Client, bucketName, file);

        uploadFileToS3(s3Client,bucketName,file, "thumbnail_" + fileName);

        return  fileName;

    }

    // uploadFileToS3 메소드 오버로딩 (파일 이름 추가)
    public static String uploadFileToS3(AmazonS3 s3Client, String bucketName, MultipartFile file, String fileName) {
        if (file == null) {
            return null;
        }
        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(file.getSize());
            metadata.setContentType(file.getContentType());

            s3Client.putObject(new PutObjectRequest(bucketName, fileName, file.getInputStream(), metadata));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return fileName;
    }

}