package yeomeong.common.aop;


import yeomeong.common.dto.JwtPayLoad;
import yeomeong.common.exception.JwtException;

/**
 * created by jihwan 2024/12/12
 */
public class UserContext {
    public static final ThreadLocal<JwtPayLoad> USER_CONTEXT = new ThreadLocal<>();

    public static Long getCurrentUserId() {

        if(UserContext.USER_CONTEXT.get() != null){
            return UserContext.USER_CONTEXT.get().getId();
        }

        throw new JwtException();
    }
}
