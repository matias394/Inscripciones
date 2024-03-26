
package com.asi.inscripciones.mvp.util;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import java.text.MessageFormat;

@Configuration
@PropertySource("classpath:messages.properties")
@ConfigurationProperties(prefix = "message")
public class MessageUtil {

	// Fields
	private String successOperation;
	private String objectDoesNotExists;
	private String duplicateObject;
	private String unexpectedException;

	// Constructors
	
	public MessageUtil() {
	}

	
	public String getSuccessOperation() {
		return successOperation;
	}

	
	public void setSuccessOperation(final String successOperation) {
		this.successOperation = successOperation;
	}

	public String getObjectDoesNotExists(final String functionality, final String fields) {
		return MessageFormat.format(this.objectDoesNotExists, functionality, fields);
	}


	public void setObjectDoesNotExists(final String objectDoesNotExists) {
		this.objectDoesNotExists = objectDoesNotExists;
	}
	
	
	public String getDuplicateObject(final String functionality, final String fields) {
		return MessageFormat.format(this.duplicateObject, functionality, fields);
	}

	public void setDuplicateObject(final String duplicateObject) {
		this.duplicateObject = duplicateObject;
	}


	public String getUnexpectedException() {
		return unexpectedException;
	}

	public void setUnexpectedException(final String unexpectedException) {
		this.unexpectedException = unexpectedException;
	}
}