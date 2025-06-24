package com.example.back.repository;

import com.example.back.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    @Override
    List<Book> findAll();
    Book findBookById(Long id);
    Book save(Book book);
    void deleteBookById(Long id);
}
