    {
      "type": "object",
      "properties": {
        "name": { "type": "string", "minLength": 1 },
        "email": { "type": "string", "format": "email" },
        "password": { "type": "string", "minLength": 8 },
        // userRole: { enum: ['admin', 'user'] },
        /** TODO: OBS: NOT ALLOWED TO UPDATE THE USER ROLE find a validation for this
        * TODO:Only admin should update the user role or update other an athlete's inormation.
        */
        // updatedAt: { type: 'string', format: 'date-time', "formatMinimum":createUserSchema.properties.createdAt.formatMinimum },
        "updatedAt": { "type": "string", "format": "date-time", "formatMinimum": "2020-01-15T15:42:00.000Z" }
      },
      "additionalProperties": false,
      "required": ["name", "password", "updatedAt"]
      // anyOf: [{ required: ['email'] }, { required: ['password'] }, { required: ['userRole'] }, { required: ['createdAt'] }],
      // oneOf: [{ required: ['name'] }, { required: ['email'] }, { required: ['password'] }, { required: ['createdAt'] }],
    }