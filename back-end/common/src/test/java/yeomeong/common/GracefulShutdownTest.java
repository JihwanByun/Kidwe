package yeomeong.common;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import static org.mockito.Mockito.*;

@SpringBootTest
public class GracefulShutdownTest {

    @Test
    public void testGracefulShutdown() {
        AutoCloseable mockResource = mock(AutoCloseable.class);

        try (AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext()) {
            context.registerBean("mockResource", AutoCloseable.class, () -> mockResource);
            context.refresh();

            context.close();

            verify(mockResource, times(1)).close();
        } catch (Exception e) {
            e.printStackTrace();
        }


    }
}
