# Use the official Maven image as the base image
FROM maven:3.9.2-amazoncorretto-17 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the pom.xml and src directory (containing the source code) to the container
COPY pom.xml .
COPY src ./src

# Package the application
RUN mvn clean package -DskipTests

# Use the official Java image as the base image for the runnable container
FROM openjdk:17-jdk-slim

# Copy the packaged jar file into our runnable container
COPY --from=build /app/target/*.jar app.jar

# Set the startup command to run the jar
CMD ["java", "-jar", "app.jar"]
