package com.integrador.back.config;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        modelMapper.addConverter(new org.modelmapper.AbstractConverter<String, Integer>() {
            @Override
            protected Integer convert(String source) {
                return source != null ? Integer.valueOf(source) : null;
            }
        });

        modelMapper.getConfiguration().setPropertyCondition(context ->
                !(context.getSource() instanceof org.hibernate.collection.spi.PersistentBag)
        );

        return modelMapper;
    }
}