//maps java objects to database tables
package com.gamers.model;//maps Java Objects to Database tables

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name="users")

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name="password_hash", nullable = false)
    private String password;

    @Column(name="created_at")
    private LocalDateTime createdAt;

    @Column(name="updated_at")
    private LocalDateTime updatedAt;

    @Column(name="created_by")
    private LocalDateTime createdBt;

    @Column(name="updated_by")
    private LocalDateTime createdBy;

    public User() {}
}

