package yeomeong.common.entity.member;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import yeomeong.common.dto.kid.KidUpdateInfoRequestDto;
import yeomeong.common.entity.kindergarten.Ban;
import yeomeong.common.entity.kindergarten.Bus;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import yeomeong.common.entity.kindergarten.Kindergarten;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Kid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private LocalDate birthday;

    private LocalDate startAttendanceDate;

    private String picture;

    private String allergies;

    @Enumerated(EnumType.STRING)
    private gtype gender; //MALE , FEMALE

    @Enumerated(EnumType.STRING)
    private atype kidStatus; //ACCEPT, DECLINE, PENDING

    private boolean isTake;

    @ManyToOne(fetch = FetchType.LAZY)
    private Kindergarten kindergarten;

    @ManyToOne(fetch = FetchType.LAZY)
    private Ban ban;

    @ManyToOne(fetch = FetchType.LAZY)
    private Bus bus;

    @JsonIgnore
    @OneToMany(mappedBy = "kid")
    @Builder.Default
    private List<KidMember> kidMembers = new ArrayList<>();

    @ColumnDefault("false")
    private Boolean isDeleted;

    public void updateFromDto(KidUpdateInfoRequestDto dto, String picture) {
        this.name = dto.name() != null ? dto.name() : this.name;
        this.birthday = dto.birthday() != null ? dto.birthday() : this.birthday;
        this.gender = dto.gender() != null ? dto.gender() : this.gender;
        this.allergies = dto.allergies() != null ? listToString(dto.allergies()) : this.allergies;
        this.picture = picture != null ? picture : this.picture;
    }

    public void setNewBan(Ban ban) {
        this.ban = ban;
    }

    public void setNewKindergarten(Kindergarten kindergarten) {
        this.kindergarten = kindergarten;
    }

    private static String listToString(List<String> list) {
        return String.join(",", list);
    }

}
