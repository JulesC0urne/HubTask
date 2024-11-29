DO
$$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'projects') THEN
        CREATE DATABASE projects;
    END IF;
END
$$;
