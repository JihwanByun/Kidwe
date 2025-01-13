package yeomeong.common.dto.attendance;

import lombok.Getter;

@Getter
public record AttendanceReasonChangeRequestDto(Long kidId, Integer year, Integer month, Integer day, String reason) {

}
