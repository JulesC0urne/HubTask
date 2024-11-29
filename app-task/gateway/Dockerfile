FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /gateway-service

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

COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jdk-jammy
WORKDIR /gateway-service
COPY --from=build /gateway-service/target/gs-gateway-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

# Commande pour exécuter l'application
ENTRYPOINT ["sh", "-c", "java -jar app.jar"]
