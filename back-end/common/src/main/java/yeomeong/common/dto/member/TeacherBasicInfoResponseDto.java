package yeomeong.common.dto.member;

import lombok.Getter;

@Getter
public record TeacherBasicInfoResponseDto(long id, String name, String tel) {
}