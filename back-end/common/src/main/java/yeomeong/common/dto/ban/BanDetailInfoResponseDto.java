package yeomeong.common.dto.ban;

import java.util.List;

import lombok.Getter;
import yeomeong.common.dto.kid.KidBasicInfoResponseDto;
import yeomeong.common.dto.member.TeacherBasicInfoResponseDto;

@Getter
public record BanDetailInfoResponseDto(long id, String name, List<KidBasicInfoResponseDto> kids, int kidCount,
                                       List<TeacherBasicInfoResponseDto> teachers, int teacherCount) {

}
