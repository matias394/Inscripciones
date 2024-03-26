package com.asi.inscripciones.mvp.controller;

import com.asi.inscripciones.mvp.entity.Menu;
import com.asi.inscripciones.mvp.exception.MenuRegistrationException;
import com.asi.inscripciones.mvp.repository.MenuRepository;
import com.asi.inscripciones.mvp.service.MenuService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

/* 
@RestController
@RequestMapping("/api/menus")
@Api(value = "A REST API application to manage menus",
        description = "This API provides the capability to manage menus", produces = "application/json")
        */
public class MenuController {
    @Autowired
    private MenuService menuService;

    @Autowired
    private MenuRepository menuRepository;

    @ApiOperation(value = "Add New Menu", produces = "application/json")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Menu saveMenu(@RequestBody @Valid Menu menu) {
        Optional<Menu> menuOptional = menuRepository.findById(menu.getId());
        if (menuOptional.isPresent()) {
            throw new MenuRegistrationException("Menu id " + menu.getId() + " already exists");
        }
        //menuService.registerDefaultMenu(menu);
        Menu MenuEntity = menuRepository.findById(menu.getId()).get();
        return MenuEntity;
    }


    @ApiOperation(value = "Get All Menus", produces = "application/json")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", dataType = "integer", paramType = "query",
                    value = "Results page you want to retrieve (0..N)", defaultValue = "0"),
            @ApiImplicitParam(name = "size", dataType = "integer", paramType = "query",
                    value = "Number of records per page.", defaultValue = "5"),
            @ApiImplicitParam(name = "sort", allowMultiple = true, dataType = "string", paramType = "query",
                    value = "Sorting criteria in the format: property(,asc|desc). " +
                    "Default sort order is ascending. " +
                    "Multiple sort criteria are supported.")
    })
    @GetMapping
    public Page<Menu> getAllMenus(Pageable pageable) {
        return menuRepository.findAll(pageable);
    }

    @ApiOperation(value = "Search Menu by Id", produces = "application/json")
    @GetMapping("/{id}")
    public ResponseEntity<Menu> getMenuById(@PathVariable Long id) {
        return menuRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Menu> updateMenu(@PathVariable Long id, @RequestBody @Valid Menu menu) {
        return menuRepository.findById(id)
                .map(x -> {
                    x.setRuta(menu.getRuta());

                    return ResponseEntity.ok(menuService.update(x));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Menu> deleteMenu(@PathVariable Long id) {
        return menuRepository.findById(id)
                .map(menu -> {
                    menuService.deleteById(id);
                    return ResponseEntity.ok(menu);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }



}
