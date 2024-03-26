package ar.inscripcion.ciudadano.lectura.mapper;

import com.asi.inscripcion.dto.FechaDiasDTO;
import com.asi.inscripcion.dto.redis.InstanciaSedeRedisDTO;
import jakarta.enterprise.context.ApplicationScoped;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@ApplicationScoped
public class InstanciaSedeMapper {



    public InstanciaSedeRedisDTO mapToInstanciaSedeRedisDTO(Map<String, String> map) {
        InstanciaSedeRedisDTO instanciaSedeMapper = new InstanciaSedeRedisDTO();
        List<FechaDiasDTO> fechaDiasDTOList = new ArrayList<>();

        Pattern horarioPattern = Pattern.compile("horarios\\.\\[(\\d+)\\]\\.horario");
        Pattern diasPattern = Pattern.compile("horarios\\.\\[(\\d+)\\]\\.dias");

        map.forEach((k, v) -> {
            if (k.equals("id")) {
                instanciaSedeMapper.setId(Long.valueOf(v));
            } else if (k.equals("cupos")) {
                instanciaSedeMapper.setCupos(Integer.valueOf(v));
            } else if (k.equals("idInstancia")) {
                instanciaSedeMapper.setIdInstancia(Long.valueOf(v));
            } else if (k.equals("instanciaNombre")) {
                instanciaSedeMapper.setInstanciaNombre(v);
            } else if (k.equals("idInscripcion")) {
                instanciaSedeMapper.setIdInscripcion(Long.valueOf(v));
            } else if (k.equals("nombreInscripcion")) {
                instanciaSedeMapper.setNombreInscripcion(v);
            } else if (k.equals("idModalidad")) {
                instanciaSedeMapper.setIdModalidad(Long.valueOf(v));
            } else if (k.equals("modalidad")) {
                instanciaSedeMapper.setModalidad(v);
            } else if (k.equals("sedeId")) {
                instanciaSedeMapper.setSedeId(Long.valueOf(v));
            } else if (k.equals("nombreSede")) {
                instanciaSedeMapper.setNombreSede(v);
            } else if (k.equals("direccionSede")) {
                instanciaSedeMapper.setDireccionSede(v);
            } else if (k.equals("fechaInicio")) {
                instanciaSedeMapper.setFechaInicio(LocalDate.parse(v));
            } else if (k.equals("fechaFin")) {
                instanciaSedeMapper.setFechaFin(LocalDate.parse(v));
            } else if (k.startsWith("horarios.") && k.endsWith(".dias")) {
                Matcher matcher = diasPattern.matcher(k);
                if (matcher.matches()) {
                    int index = Integer.parseInt(matcher.group(1));
                    while (fechaDiasDTOList.size() <= index) {
                        fechaDiasDTOList.add(new FechaDiasDTO());
                    }
                    fechaDiasDTOList.get(index).setDias(v);
                }
            } else if (k.startsWith("horarios.") && k.endsWith(".horario")) {
                Matcher matcher = horarioPattern.matcher(k);
                if (matcher.matches()) {
                    int index = Integer.parseInt(matcher.group(1));
                    while (fechaDiasDTOList.size() <= index) {
                        fechaDiasDTOList.add(new FechaDiasDTO());
                    }
                    fechaDiasDTOList.get(index).setHorario(v);
                }
            }
        });

        instanciaSedeMapper.setHorarios(fechaDiasDTOList);
        return instanciaSedeMapper;
    }
}
