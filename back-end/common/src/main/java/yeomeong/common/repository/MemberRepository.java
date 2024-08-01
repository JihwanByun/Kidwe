package yeomeong.common.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import yeomeong.common.entity.kindergarten.Ban;
import yeomeong.common.entity.kindergarten.Kindergarten;
import yeomeong.common.entity.member.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    boolean existsByEmail(String email);

    Member findByEmail(String email);

    @Modifying
    @Query("UPDATE Member m SET m.isDeleted = true WHERE m.email = :email")
    void deleteMemberByEmail(@Param("email") String email);

    @Modifying
    @Transactional
    @Query("UPDATE Member m SET m.ban = :ban WHERE m.id = :id")
    void updateMemberBan(@Param("id") Long id, @Param("ban") Ban ban);

    @Modifying
    @Transactional
    @Query("UPDATE Member m SET m.kindergarten = :kindergarten WHERE m.id = :id")
    void updateMemberKindergarten(@Param("id") Long id, @Param("kindergarten") Kindergarten kindergarten);

}