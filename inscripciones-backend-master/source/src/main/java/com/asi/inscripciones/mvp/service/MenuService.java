package com.asi.inscripciones.mvp.service;

import com.asi.inscripciones.mvp.entity.Menu;
import com.asi.inscripciones.mvp.repository.MenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuService {

    @Autowired
    final private MenuRepository menuRepository;


    public Iterable<Menu> listAll() {
        return menuRepository.findAll();
    }

    public Menu get(Long id) {
        return menuRepository.findById(id).get();
    }

    public List<Menu> listMenus() {
        return menuRepository.findAll();
    }

    public void save(Menu user) {
        menuRepository.save(user);
    }

    public Menu update(Menu user) {
        return menuRepository.save(user);
    }

    public void deleteById(Long id) {
        menuRepository.deleteById(id);
    }
}
