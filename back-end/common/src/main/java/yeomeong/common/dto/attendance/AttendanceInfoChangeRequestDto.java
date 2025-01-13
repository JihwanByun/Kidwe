package yeomeong.common.dto.attendance;

import java.util.List;
import lombok.Getter;
import yeomeong.common.entity.AttendanceType;

@Getter
public record AttendanceInfoChangeRequestDto(Integer year, Integer month, Integer day, List<Long> kidIds,
                                             AttendanceType attendedToday, String reason) {

}
