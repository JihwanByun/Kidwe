package yeomeong.common.entity.jpa.kindergarten;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import yeomeong.common.repository.jpa.KindergartenRepository;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Menu {

    @Id @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Kindergarten kindergarten;

    private String lunch;
    private String lunchAllergies;

    private String snack;
    private String snackAllergies;

    private String dinner;
    private String dinnerAllergies;
    private LocalDate menuDate;


    public Menu(Kindergarten kindergarten, String lunch, String lunchAllergies, String snack, String snackAllergies, String dinner, String dinnerAllergies, LocalDate menuDate) {
        this.kindergarten = kindergarten;
        this.lunch = lunch;
        this.lunchAllergies = lunchAllergies;
        this.snack = snack;
        this.snackAllergies = snackAllergies;
        this.dinner = dinner;
        this.dinnerAllergies = dinnerAllergies;
        this.menuDate = menuDate;
    }


}