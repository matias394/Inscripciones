package com.asi.inscripcion.escritura.codec;

import com.asi.inscripcion.document.CitizenResponse;
import org.bson.codecs.Codec;
import org.bson.codecs.configuration.CodecProvider;
import org.bson.codecs.configuration.CodecRegistry;

public class CitizenResponseCodecProvider implements CodecProvider {
    @Override
    public <T> Codec<T> get(Class<T> clazz, CodecRegistry registry) {
        if (CitizenResponse.class.equals(clazz)) {
            return (Codec<T>) new CitizenResponseCodec(registry);
        }
        return null;
    }
}
