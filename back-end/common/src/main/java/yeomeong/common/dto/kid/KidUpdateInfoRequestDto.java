package yeomeong.common.dto.kid;

import java.time.LocalDate;
import java.util.List;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;
import yeomeong.common.entity.member.gtype;

@Getter
public class KidUpdateInfoRequestDto {

		private final long id;
    private final String name;
    private final LocalDate birthday;
    private final gtype gender;
    private final List<String> allergies;
    private final Long banId;
    private final Long kindergartenId;

    public boolean hasBanId() {
        return this.banId != null;
    }

    public boolean hasKindergartenId() {
        return this.kindergartenId != null;
    }

}
