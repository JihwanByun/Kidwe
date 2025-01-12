package yeomeong.common.dto.notification;

import java.util.List;
import lombok.Getter;

@Getter
public class NotificationDeleteRequestDto {

	private final List<Long> notificationIds;

}
