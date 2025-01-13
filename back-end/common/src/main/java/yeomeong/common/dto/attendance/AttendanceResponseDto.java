package yeomeong.common.dto.attendance;

import java.time.LocalDate;

import lombok.Getter;
import yeomeong.common.entity.AttendanceType;

@Getter
public record AttendanceResponseDto(long attendanceId, long banId, String banName, long kidId, String kidName,
                                    String reason, String image, AttendanceType attendedToday, LocalDate date) {

}
