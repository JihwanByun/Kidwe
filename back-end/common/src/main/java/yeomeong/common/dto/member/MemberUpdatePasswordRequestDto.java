package yeomeong.common.dto.member;

import lombok.Getter;

@Getter
public class MemberUpdatePasswordRequestDto {

    private final Long id;
    private final String password;

}
