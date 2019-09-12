SELECT role.roleName, role.capabilityName, role.bandName, capability.jobfamilyName FROM role JOIN (capability)
    ON (role.capabilityName = capability.capabilityName);

