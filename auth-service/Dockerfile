# Stage 1: Build the application with Maven
FROM maven:3.9.4-eclipse-temurin-17 AS build

WORKDIR /auth-service

# Copy the custom CA certificate
COPY SOLUTEC-RootCA_base64.crt /usr/local/share/ca-certificates/SOLUTEC-RootCA_base64.crt

# Update SSL certificates in the container
RUN apt-get update && \
    apt-get install -y ca-certificates && \
    update-ca-certificates

# Import the certificate into the Java keystore
RUN keytool -importcert -file /usr/local/share/ca-certificates/SOLUTEC-RootCA_base64.crt \
    -keystore /opt/java/openjdk/lib/security/cacerts \
    -alias solutec-ca -storepass changeit -noprompt

# Copy the Maven project files
COPY pom.xml .  
COPY src ./src  

# Run Maven to clean and package the application, skipping tests
RUN mvn clean package -DskipTests

# Stage 2: Create the final Docker image
FROM eclipse-temurin:17-jdk-jammy

WORKDIR /auth-service

# Copy the generated JAR file from the build stage
COPY --from=build /auth-service/target/auth-service-0.0.1-SNAPSHOT.jar app.jar

# Expose the application port
EXPOSE 8081

# Command to run the application
ENTRYPOINT ["sh", "-c", "java -jar app.jar"]
