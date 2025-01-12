package yeomeong.common.dto.member;

import lombok.Builder;
import lombok.Getter;
import yeomeong.common.entity.member.Member;

@Getter
@Builder
public class TeacherBasicInfoResponseDto {

		private final long id;
    private final String name;
    private final String tel;

    public static TeacherBasicInfoResponseDto toTeacherInfoDto(Member member) {
        return TeacherBasicInfoResponseDto.builder()
            .id(member.getId())
            .name(member.getName())
            .tel(member.getTel())
            .build();
    }

}