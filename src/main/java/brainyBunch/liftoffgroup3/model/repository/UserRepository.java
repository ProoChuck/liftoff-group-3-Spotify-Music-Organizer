package brainyBunch.liftoffgroup3.model.repository;

import brainyBunch.liftoffgroup3.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    public User findByUsername(String username);
}
