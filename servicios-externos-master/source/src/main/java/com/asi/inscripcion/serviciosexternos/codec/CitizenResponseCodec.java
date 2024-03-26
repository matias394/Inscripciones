package com.asi.inscripcion.serviciosexternos.codec;

import com.asi.inscripcion.document.CitizenResponse;
import com.google.gson.Gson;

import org.bson.*;
import org.bson.codecs.Codec;
import org.bson.codecs.DecoderContext;
import org.bson.codecs.EncoderContext;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.types.ObjectId;
import org.jboss.logging.Logger;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

public class CitizenResponseCodec implements Codec<CitizenResponse> {

    protected final Logger logger = Logger.getLogger(getClass());
    private Codec<Document> documentCodec;

    public CitizenResponseCodec(CodecRegistry registry) {
        documentCodec = registry.get(Document.class);
    }

    @Override
    public void encode(BsonWriter writer, CitizenResponse value, EncoderContext encoderContext) {
        logger.info("Entrando en el encode de CitizenResponseCodec");
        // Implementa la lógica de codificación aquí
        if (value != null){
            Class<CitizenResponse> clazz = CitizenResponse.class;
            writer.writeStartDocument();
            Field[] fields = clazz.getDeclaredFields();
            for (Field field : fields) {
                try {
                    if (field != null && ("respuesta".equals(field.getName()))) {
                        Object fieldValue = obtenerValorCampo(value, field.getName());
                        writeRespuesta(writer, field, fieldValue, encoderContext);
                    } else if (field != null) {
                        Object fieldValue = obtenerValorCampo(value, field.getName());
                        writerField(writer, field.getName(), fieldValue);
                    }
                } catch (NoSuchFieldException e) {
                    throw new RuntimeException(e);
                } catch (IllegalAccessException e) {
                    throw new RuntimeException(e);
                }
            }
            writer.writeEndDocument();
        }else{
            logger.info("Value esta llegando null en el encode de CitizenResponseCodec");
        }
    }

    private void writeRespuesta(BsonWriter writer, Field field, Object fieldValue, EncoderContext encoderContext) {
        logger.info("Entrando al metodo writeRespuesta de CitizenResponseCodec");
        writer.writeName("respuesta");
        Document document = convertirObjetoADocument(fieldValue);
        documentCodec.encode(writer, document, encoderContext);
    }

    private Document convertirObjetoADocument(Object objet) {
        logger.info("Entrando al metodo convertirObjetoADocument de CitizenResponseCodec con el objeto: " + objet);
        Map<String, Object> hashMap = new HashMap();
        if (objet instanceof Map<?, ?>) {
            hashMap = (Map<String, Object>) objet;
            logger.info("IF MAP HASHMAP ******************* " + hashMap);
        } else if (objet instanceof String) {
            Gson gson = new Gson();
            hashMap = gson.fromJson(objet.toString(), Map.class);
            logger.info("IF MAP STRING ******************* " + hashMap);
        }
        Document document = new Document();
        for (Map.Entry<String, Object> entry : hashMap.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();
            if (value != null){
                if (value instanceof Map<?, ?>){
                    logger.info("Es un hashmap");
                    Document documentValue = convertirObjetoADocument(value);
                    document.put(key, documentValue);
                }else{
                    BsonValue bsonValue = convertirAValorBson(value);
                    document.put(key, bsonValue);
                }
            }
        }
        return document;
    }

    private BsonValue convertirAValorBson(Object valor) {
        logger.info("Convirtiendo un valor a Bson valor: convertirAValorBson");
        if (valor instanceof String) {
            return new BsonString(valor.toString());
        } else if (valor instanceof Long) {
            return new BsonInt64((Long) valor);
        } else if (valor instanceof Integer) {
            return new BsonInt32((Integer) valor);
        } else if (valor instanceof Boolean) {
            return new BsonBoolean((Boolean) valor);
        }else{
            logger.info("Tipo de dato no soportado o registrado");
            return new BsonNull();
        }
    }

    private void writerField(BsonWriter writer, String fieldName, Object campo) {
        logger.info("Escribiendo un campo/valor en el writer: writerField");
        if (campo instanceof String) {
            writer.writeString(fieldName, (String) campo);
        }else if (campo instanceof Long) {
            writer.writeInt64(fieldName, (Long) campo);
        }else if (campo instanceof Integer) {
            writer.writeInt32(fieldName, (Integer) campo);
        }else if (campo instanceof Boolean) {
            writer.writeBoolean(fieldName, (Boolean) campo);
        }else if (campo instanceof ObjectId) {
            writer.writeObjectId(fieldName, (ObjectId) campo);
        }else{
            logger.info("Tipo de dato no soportado o registrado");
        }
    }

    private static Object obtenerValorCampo(Object objeto, String nombreCampo)
            throws NoSuchFieldException, IllegalAccessException {
        // Obtener la clase del objeto
        Class<?> clazz = objeto.getClass();
        // Utilizar reflexión para obtener el campo
        Field campo = clazz.getDeclaredField(nombreCampo);
        // Asegura que el campo sea accesible (puede ser privado)
        campo.setAccessible(true);
        // Obtener el valor del campo para el objeto proporcionado
        return campo.get(objeto);
    }

    @Override
    public CitizenResponse decode(BsonReader reader, DecoderContext decoderContext) {
        Class<CitizenResponse> clazz = CitizenResponse.class;
        CitizenResponse citizenResponse = new CitizenResponse();

        reader.readStartDocument();

        while (reader.readBsonType() != BsonType.END_OF_DOCUMENT) {
            String fieldName = reader.readName();
            // Utiliza reflexión para encontrar el campo en CitizenResponse con el mismo nombre
            Field field = findField(clazz, fieldName);
            if (field != null && !"respuesta".equals(fieldName)) {
                Object valor = readValue(reader);
                asignarValor(field, citizenResponse, valor);
            } else if ("respuesta".equals(fieldName)) {
                procesarRespuesta(reader, field, citizenResponse);
            } else {
                // Puedes manejar otros campos si es necesario
                reader.skipValue();
            }
        }
        reader.readEndDocument();
        return citizenResponse;
    }

    private void procesarRespuesta(BsonReader reader, Field field, CitizenResponse citizenResponse) {
        BsonType bsonType = reader.getCurrentBsonType();
        switch (bsonType) {
            case STRING:
                asignarValor(field, citizenResponse, reader.readString());
            case DOCUMENT:
                // Lee el BsonDocument
                BsonDocument bsonDocument = readBsonDocument(reader);
                // Asigna el BsonDocument
                asignarValor(field, citizenResponse, bsonDocument.toString());
                break;
            default:
                // Maneja otros tipos según sea necesario
                break;
        }
    }

    private void asignarValor(Field field, CitizenResponse citizenResponse, Object valor) {
        try {
            // Asigna el valor al campo correspondiente en CitizenResponse
            field.setAccessible(true);
            field.set(citizenResponse, valor);
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        }
    }

    private Field findField(Class<?> clazz, String fieldName) {
        try {
            return clazz.getDeclaredField(fieldName);
        } catch (NoSuchFieldException e) {
            return null;
        }
    }

    private BsonDocument readBsonDocument(BsonReader reader) {
        // Asegura estar al inicio del documento
        reader.readStartDocument();
        // Crea un BsonDocument para almacenar el contenido
        BsonDocument bsonDocument = new BsonDocument();
        // Itera sobre los campos del documento
        while (reader.readBsonType() != BsonType.END_OF_DOCUMENT) {
            // Lee el nombre del campo
            String fieldName = reader.readName();
            // Lee el valor del campo y agrega al BsonDocument
            BsonValue value = readBsonValue(reader);
            if (value != null){
                bsonDocument.put(fieldName, value);
            }
        }
        // Finaliza la lectura del documento
        reader.readEndDocument();
        return bsonDocument;
    }

    public static Object readValue(BsonReader reader) {
        BsonType bsonType = reader.getCurrentBsonType();
        switch (bsonType) {
            case STRING:
                return reader.readString();
            case INT32:
                return reader.readInt32();
            case INT64:
                return reader.readInt64();
            case DOUBLE:
                return reader.readDouble();
            case DECIMAL128:
                return reader.readDecimal128();
            case BOOLEAN:
                return reader.readBoolean();
            case NULL:
                reader.readNull();
                return null;
            case OBJECT_ID:
                return reader.readObjectId();
            // Puedes agregar más casos según los tipos de datos que necesitas manejar
            default:
                // Puedes manejar otros tipos o lanzar una excepción según tus necesidades
                throw new UnsupportedOperationException("Tipo BSON no soportado: " + bsonType);
        }
    }

    private BsonValue readBsonValue(BsonReader reader) {
        BsonType bsonType = reader.getCurrentBsonType();
        switch (bsonType) {
            case DOCUMENT:
                return readBsonDocument(reader);
            case STRING:
                return new BsonString(reader.readString());
            case INT32:
                return new BsonInt32(reader.readInt32());
            case INT64:
                return new BsonInt64(reader.readInt64());
            case DOUBLE:
                return new BsonDouble(reader.readDouble());
            case DECIMAL128:
                return new BsonDecimal128(reader.readDecimal128());
            case BOOLEAN:
                return new BsonBoolean(reader.readBoolean());
            case NULL:
                reader.readNull();
                return null;
            case OBJECT_ID:
                return new BsonObjectId(reader.readObjectId());
            // Puedes agregar más casos según los tipos de datos que necesitas manejar
            default:
                // Puedes manejar otros tipos o lanzar una excepción según tus necesidades
                throw new UnsupportedOperationException("Tipo BSON no soportado: " + bsonType);
        }
    }

    @Override
    public Class<CitizenResponse> getEncoderClass() {
        return CitizenResponse.class;
    }

}
