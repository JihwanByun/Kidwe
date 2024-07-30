package yeomeong.common.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yeomeong.common.document.Memo;
import yeomeong.common.dto.MemoDto;
import yeomeong.common.repository.MemoRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemoService {
    private final MemoRepository memoRepository;

    // 메모 생성하기
    public Memo createMemo(MemoDto memoDto) {
        Memo memo = new Memo();
        memo.setId(memoDto.getId());
        memo.setCreatedTime(memoDto.getCreatedTime()==null?LocalDateTime.now():memoDto.getCreatedTime());
        memo.setUpdatedTime(memoDto.getUpdatedTime()==null?memo.getUpdatedTime():memoDto.getUpdatedTime());
        memo.setIsDeleted(memoDto.getIsDeleted()==null?false:memoDto.getIsDeleted());
        memo.setLesson(memoDto.getLesson());
        memo.setKids(memoDto.getKids());
        memo.setTags(memoDto.getTags());
        memo.setContent(memoDto.getContent());

        return memoRepository.save(memo);
    }

    // 날짜별 메모 조회하기
    public List<Memo> getMemosByTeacherIdAndDate(Long teacherId, LocalDate date) {
        return memoRepository.findByTeacherIdAndDate(teacherId, date);
    }

    // 날짜별 아이별 메모 조회하기
    public List<Memo> getMemosByTeacherIdAndDateAndKidId(Long teacherId, LocalDate date, Long kidId) {
        return memoRepository.findByTeacherIdAndDateAndKidId(teacherId, date, kidId);
    }

    // 메모 수정하기
    public Memo updateMemo(String id, Memo updatedMemo) {
        Optional<Memo> optionalMemo = memoRepository.findById(id);
        if (optionalMemo.isPresent()) {
            Memo memo = optionalMemo.get();
            memo.setUpdatedTime(updatedMemo.getUpdatedTime());
            memo.setIsDeleted(updatedMemo.getIsDeleted());
            memo.setKids(updatedMemo.getKids());
            memo.setTags(updatedMemo.getTags());
            memo.setContent(updatedMemo.getContent());
            memo.setUpdatedTime(LocalDateTime.now());
            return memoRepository.save(memo);
        } else {
            throw new RuntimeException("Memo not found with id " + id);
        }
    }

    // 메모 삭제하기
    public void deleteMemo(String id) {
        Optional<Memo> optionalMemo = memoRepository.findById(id);
        if (optionalMemo.isPresent()) {
            Memo memo = optionalMemo.get();
            memo.setIsDeleted(true);
            memoRepository.save(memo);
        } else {
            throw new RuntimeException("Memo not found with id " + id);
        }
    }
}