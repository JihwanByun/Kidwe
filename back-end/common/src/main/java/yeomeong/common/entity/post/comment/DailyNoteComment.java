package yeomeong.common.entity.post.comment;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yeomeong.common.entity.member.Member;
import yeomeong.common.entity.post.Announcement;
import yeomeong.common.entity.post.DailyNote;

@Entity

@Getter
@NoArgsConstructor
public class DailyNoteComment {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private DailyNote dailyNote;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    private DailyNoteComment parentComment;

    @OneToMany(mappedBy = "parentComment",cascade = CascadeType.ALL)
    private List<DailyNoteComment> replies;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean isDeleted;

    @Builder
    public DailyNoteComment(DailyNote dailyNote, Member member, String content, DailyNoteComment parentComment){
        this.dailyNote = dailyNote;
        this.member = member;
        this.content = content;
        this.parentComment = parentComment;
        this.replies = new ArrayList<>();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = this.createdAt;
        this.isDeleted = false;
    }

    public void setNewContent(String content) {
        this.content = content;
    }

    public void delete(){
        this.isDeleted = true;
    }

    public void update(){
        this.updatedAt = LocalDateTime.now();
    }

}
