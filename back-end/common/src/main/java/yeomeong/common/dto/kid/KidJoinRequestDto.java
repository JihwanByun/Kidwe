package yeomeong.common.dto.kid;

import java.time.LocalDate;
import java.util.List;
import lombok.Getter;
import lombok.ToString;
import yeomeong.common.entity.kindergarten.Ban;
import yeomeong.common.entity.kindergarten.Kindergarten;
import yeomeong.common.entity.member.Kid;
import yeomeong.common.entity.member.atype;
import yeomeong.common.entity.member.gtype;

@Getter
@ToString
public class KidJoinRequestDto {

	private String name;
    private LocalDate birthday;
    private gtype gender;
    private List<String> allergies;
    private String picture;
    private Long kindergartenId;
    private Long banId;

    public static Kid toKidEntity(KidJoinRequestDto kidJoinRequestDto,
        Kindergarten kindergarten, Ban ban) {
        return Kid.builder()
            .name(kidJoinRequestDto.getName())
            .birthday(kidJoinRequestDto.getBirthday())
            .allergies(listToString(kidJoinRequestDto.getAllergies()))
            .picture(kidJoinRequestDto.getPicture())
            .gender(kidJoinRequestDto.getGender())
            .ban(ban)
            .kindergarten(kindergarten)
            .kidStatus(atype.PENDING)
            .isDeleted(false)
            .build();
    }

    private static String listToString(List<String> list) {
        return String.join(",", list);
    }

}
