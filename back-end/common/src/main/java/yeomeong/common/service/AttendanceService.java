package yeomeong.common.service;

import java.time.DateTimeException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yeomeong.common.dto.attendance.AttendanceInfoChangeRequestDto;
import yeomeong.common.dto.attendance.AttendanceReasonChangeRequestDto;
import yeomeong.common.dto.attendance.AttendanceResponseDto;
import yeomeong.common.exception.CustomException;
import yeomeong.common.exception.ErrorCode;
import yeomeong.common.repository.AttendanceRepository;
import yeomeong.common.repository.BanRepository;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;

    public AttendanceService(AttendanceRepository attendanceRepository, BanRepository banRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    public List<AttendanceResponseDto> getAttendancesByBanId(Long banId, LocalDate localDate) {
        List<AttendanceResponseDto> attendanceResponseDtos = new ArrayList<>();
        attendanceRepository.findAttendancesByBanIdAndDate(banId, localDate).forEach(attendance ->
            attendanceResponseDtos.add(AttendanceResponseDto.toAttendanceResponseDto(attendance))
        );
        return attendanceResponseDtos;
    }

    @Transactional
    public void updateAttendances(AttendanceInfoChangeRequestDto changeRequestDto) {
        if(changeRequestDto.containsNull()) {
            throw new CustomException(ErrorCode.INVALID_INPUT_VALUE);
        }

        try {
            LocalDate localDate = LocalDate.of(changeRequestDto.getYear(), changeRequestDto.getMonth(), changeRequestDto.getDay());
            for (Long kidId : changeRequestDto.getKidIds()) {
                if(attendanceRepository.updateKidsAttendanceState(kidId, localDate, changeRequestDto.getAttendedToday()) != 1) {
                    throw new CustomException(ErrorCode.UPDATE_FAILED);
                }
            }
        } catch (DateTimeException e) {
            throw new CustomException(ErrorCode.INVALID_DATE_VALUE);
        }

    }

    public void updateAttendanceReason(AttendanceReasonChangeRequestDto changeRequestDto) {
        if(changeRequestDto.containsNull()) {
            throw new CustomException(ErrorCode.INVALID_INPUT_VALUE);
        }
        try {
            if(attendanceRepository.updateKidsAttendanceReason(
                changeRequestDto.getKidId(),
                LocalDate.of(changeRequestDto.getYear(), changeRequestDto.getMonth(), changeRequestDto.getDay()),
                changeRequestDto.getReason()
            ) != 1) {
                throw new CustomException(ErrorCode.NO_CHANGES_DETECTED);
            }
        } catch (DateTimeException e) {
            throw new CustomException(ErrorCode.INVALID_DATE_VALUE);
        }
    }

}