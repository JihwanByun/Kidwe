package yeomeong.common.dto.kid;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import yeomeong.common.entity.member.Kid;

@Getter
public class KidSummaryResponseDto {
    private final Long id;
    private final String name;
    private final String picture;

    public KidSummaryResponseDto(Kid kid){
        this.id = kid.getId();
        this.name = kid.getName();
        this.picture = kid.getPicture();
    }
}
