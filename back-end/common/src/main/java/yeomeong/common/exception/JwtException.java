package yeomeong.common.exception;

public class JwtException extends CustomException {


    public JwtException() {
        super(ErrorCode.JWT_ERROR);
    }

    public JwtException(ErrorCode errorCode){
        super(errorCode);
    }
}
