DO
$$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'messages') THEN
        CREATE DATABASE messages;
    END IF;
END
$$;
