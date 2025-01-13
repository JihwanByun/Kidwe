package yeomeong.common.dto.ban;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public record BanChangeRequestDto(Long id, Long banId) {
}
