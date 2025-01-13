package yeomeong.common.dto.kid;

import lombok.Getter;

@Getter
public record KidBasicInfoResponseDto(long id, String name, String image) {
}
