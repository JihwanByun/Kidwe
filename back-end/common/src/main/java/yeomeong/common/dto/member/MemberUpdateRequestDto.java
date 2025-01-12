package yeomeong.common.dto.member;

import lombok.Getter;

@Getter
public class MemberUpdateRequestDto {

		private final Long id;
    private final String name;
    private final String tel;
    private final String password;

}
