package yeomeong.common.config;


import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.function.Supplier;

@Configuration
public class QuerydslConfig {

    @PersistenceContext
    private  EntityManager em;

    @Bean
    public JPAQueryFactory jpaQueryFactory(){
        // Supplier로 변환
        return new JPAQueryFactory(em);

    }

}