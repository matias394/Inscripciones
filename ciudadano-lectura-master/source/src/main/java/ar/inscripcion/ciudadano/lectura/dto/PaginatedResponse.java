package ar.inscripcion.ciudadano.lectura.dto;

import java.util.ArrayList;
import java.util.List;

public class PaginatedResponse<T> {
    private int totalPages;
    private long totalElements;
    private int size;
    private List<T> content;
    private int number;
    private boolean first;
    private boolean last;
    private int numberOfElements;
    private boolean empty;

    public PaginatedResponse() {
        this.content = new ArrayList<>();
        this.totalElements = 0;
        this.size = 0;
        this.first = true;
        this.last = true;
        this.number = 0;
        this.numberOfElements = 0;
        this.empty = true;
        this.totalPages = 0;
    }

    public PaginatedResponse(List<T> content, int totalElements, int size, boolean first, boolean last, int number, int numberOfElements, boolean empty, int totalPages) {
        this.content = content;
        this.totalElements = totalElements;
        this.size = size;
        this.first = first;
        this.last = last;
        this.number = number;
        this.numberOfElements = numberOfElements;
        this.empty = empty;
        this.totalPages = totalPages;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(long totalElements) {
        this.totalElements = totalElements;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public List<T> getContent() {
        return content;
    }

    public void setContent(List<T> content) {
        this.content = content;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public boolean isFirst() {
        return first;
    }

    public void setFirst(boolean first) {
        this.first = first;
    }

    public boolean isLast() {
        return last;
    }

    public void setLast(boolean last) {
        this.last = last;
    }

    public int getNumberOfElements() {
        return numberOfElements;
    }

    public void setNumberOfElements(int numberOfElements) {
        this.numberOfElements = numberOfElements;
    }

    public boolean isEmpty() {
        return empty;
    }

    public void setEmpty(boolean empty) {
        this.empty = empty;
    }
}
