const SEMESTER_DATA = {
    1: {
        common: [
            { code: 'EEL-100', name: 'Fund. of Electrical & Electronics', short: 'FEE', credits: 3 },
            { code: 'EEL-101', name: 'Fund. of Electrical & Electronics Lab', short: 'FEE Lab', credits: 1 },
            { code: 'SHM-132', name: 'Applied Physics', short: 'PHY', credits: 2 },
            { code: 'SHM-133', name: 'Applied Physics Lab', short: 'PHY Lab', credits: 1 },
            { code: 'AEC-153', name: 'Comm. & Technical Writing', short: 'CTW', credits: 3 },
            { code: 'VAC-158', name: 'Env. Science & Sustainability', short: 'ESS', credits: 2 },
            { code: 'VAC-159', name: 'Env. Science & Sustainability Lab', short: 'ESS Lab', credits: 1 },
            { code: 'SEC-143', name: 'Engg. Graphics & Design with UI/UX', short: 'EG & UI/UX', credits: 3 }
        ],
        electives: { 
            'Computing': [
                { code: 'ITH-111', name: 'Basics of Computing (Python)', short: 'Python', credits: 3 },
                { code: 'ITH-112', name: 'Basics of Computing Lab', short: 'Python Lab', credits: 1 }
            ],
            'Biology': [
                { code: 'SHM-111', name: 'Biology for Engineers', short: 'Bio', credits: 3 },
                { code: 'SHM-112', name: 'Biology for Engineers Lab', short: 'Bio Lab', credits: 1 }
            ]
        }
    },
    2: {
        common: [
            { code: 'CMP-100', name: 'Fund. of Programming (C)', short: 'FOP', credits: 3 },
            { code: 'CMP-101', name: 'Fund. of Programming Lab', short: 'FOP Lab', credits: 1 },
            { code: 'SHM-134', name: 'Applied Mathematics - I', short: 'Math-I', credits: 3 },
            { code: 'AEC-151', name: 'Creative Thinking & Innovation', short: 'CTI', credits: 2 },
            { code: 'AEC-152', name: 'Creative Thinking & Innovation Lab', short: 'CTI Lab', credits: 1 },
            { code: 'VAC-156', name: 'Indian Knowledge System', short: 'IKS', credits: 2 },
            { code: 'VAC-157', name: 'Indian Knowledge System Lab', short: 'IKS Lab', credits: 1 },
            { code: 'SEC-144', name: 'Electronics & Mechanical Workshop', short: 'Workshop', credits: 3 }
        ],
        electives: {
            'Mech/Civil': [
                { code: 'MCV-111', name: 'Basics of Mech & Civil Engg', short: 'Mech/Civil', credits: 3 },
                { code: 'MCV-112', name: 'Basics of Mech & Civil Engg Lab', short: 'M/C Lab', credits: 1 }
            ],
            'Chemistry': [
                { code: 'SHM-113', name: 'Engineering Chemistry', short: 'Chem', credits: 3 },
                { code: 'SHM-114', name: 'Engineering Chemistry Lab', short: 'Chem Lab', credits: 1 }
            ]
        }
    },
    3: {
        common: [
            { code: 'EEL-200', name: 'DC Machines & Transformers', short: 'DC M/C', credits: 3 },
            { code: 'EEL-201', name: 'DC Machines & Transformers Lab', short: 'DC Lab', credits: 1 },
            { code: 'EEL-202', name: 'Electronic Devices and Circuits', short: 'EDC', credits: 3 },
            { code: 'EEL-203', name: 'Electronic Devices and Circuits Lab', short: 'EDC Lab', credits: 1 },
            { code: 'SHM-232', name: 'Applied Mathematics - II', short: 'Math-II', credits: 3 },
            { code: 'AEC-251', name: 'AEC Course', short: 'AEC', credits: 2 },
            { code: 'EEL-241', name: 'Electrical Workshop', short: 'Elec WS', credits: 3 },
        ],
        electives: {
            'Comm. Engg': [
                { code: 'EEL-221', name: 'Electromagnetic & Comm. Engg', short: 'EM & Comm', credits: 3 },
                { code: 'EEL-222', name: 'Communication Engineering Lab', short: 'Comm Lab', credits: 1 }
            ],
            'Material Science': [
                { code: 'EEL-223', name: 'Electrical & Elec. Material Science', short: 'Mat Sci', credits: 3 },
                { code: 'EEL-224', name: 'Electrical & Elec. Material Science Lab', short: 'Mat Sci Lab', credits: 1 }
            ]
        }
    },
    4: {
        common: [
            { code: 'EEL-204', name: 'AC Machines', short: 'AC M/C', credits: 3 },
            { code: 'EEL-205', name: 'AC Machines Lab', short: 'AC Lab', credits: 1 },
            { code: 'EEL-206', name: 'Digital System Design', short: 'DSD', credits: 3 },
            { code: 'EEL-207', name: 'Digital System Design Lab', short: 'DSD Lab', credits: 1 },
            { code: 'EEL-208', name: 'Electrical Circuits', short: 'Circuits', credits: 3 },
            { code: 'EEL-209', name: 'Electrical Circuits Lab', short: 'Circuits Lab', credits: 1 },
            { code: 'EEL-210', name: 'Electrical & Elec. Instrumentation', short: 'Instru', credits: 3 },
            { code: 'EEL-211', name: 'Electrical & Elec. Instrumentation Lab', short: 'Instru Lab', credits: 1 }
        ],
        electives: {
            'Utilization': [
                { code: 'EEL-225', name: 'Utilization Of Electrical Energy', short: 'UEE', credits: 3 },
                { code: 'EEL-226', name: 'Utilization Of Elect. Engg Lab', short: 'UEE Lab', credits: 1 }
            ],
            'Numerical Techniques': [
                { code: 'EEL-227', name: 'Numerical Techniques', short: 'Num Tech', credits: 3 },
                { code: 'EEL-228', name: 'Numerical Techniques Lab', short: 'Num Tech Lab', credits: 1 }
            ]
        }
    }
};
