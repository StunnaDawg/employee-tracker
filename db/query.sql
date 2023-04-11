SELECT roleNames.*, departmentNames.department_name
FROM roleNames
JOIN departmentNames ON roleNames.department_id = departmentNames.id;