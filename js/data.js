const DATA = {
    'RC2024-25': {
        'ENE': {
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
                },
                electiveMode: 'track'
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
                },
                electiveMode: 'track'
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
                },
                electiveMode: 'track'
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
                },
                electiveMode: 'track'
            }
        },
        'COMP': {
            1: {
                common: [
                    { code: 'CMP-100', name: 'Fund. of Programming (C)', short: 'FOP', credits: 3 },
                    { code: 'CMP-101', name: 'Fund. of Programming Lab', short: 'FOP Lab', credits: 1 },
                    { code: 'SHM-131', name: 'Engineering Mathematics-I', short: 'Math-I', credits: 3 },
                    { code: 'AEC-151', name: 'Creative Thinking & Innovation', short: 'CTI', credits: 2 },
                    { code: 'AEC-152', name: 'Creative Thinking & Innovation Lab', short: 'CTI Lab', credits: 1 },
                    { code: 'VAC-156', name: 'Indian Knowledge System', short: 'IKS', credits: 2 },
                    { code: 'VAC-157', name: 'Indian Knowledge System Lab', short: 'IKS Lab', credits: 1 },
                    { code: 'SEC-144', name: 'Electronics & Mechanical Workshop', short: 'Workshop', credits: 3 }
                ],
                electives: {
                    'Electrical': [
                        { code: 'EEL-111', name: 'Basics of Elec & Elec Engg', short: 'BEEE', credits: 3 },
                        { code: 'EEL-112', name: 'Basics of Elec & Elec Engg Lab', short: 'BEEE Lab', credits: 1 }
                    ],
                    'Biology': [
                        { code: 'SHM-111', name: 'Biology for Engineers', short: 'Bio', credits: 3 },
                        { code: 'SHM-112', name: 'Biology for Engineers Lab', short: 'Bio Lab', credits: 1 }
                    ]
                },
                electiveMode: 'track'
            },
            2: {
                common: [
                    { code: 'ITH-100', name: 'Fund. of Computing (Python)', short: 'Python', credits: 3 },
                    { code: 'ITH-101', name: 'Fund. of Computing Lab', short: 'Python Lab', credits: 1 },
                    { code: 'SHM-132', name: 'Applied Physics', short: 'Physics', credits: 2 },
                    { code: 'SHM-133', name: 'Applied Physics Lab', short: 'Phy Lab', credits: 1 },
                    { code: 'AEC-153', name: 'Comm. & Technical Writing', short: 'CTW', credits: 3 },
                    { code: 'VAC-158', name: 'Env. Science & Sustainability', short: 'ESS', credits: 2 },
                    { code: 'VAC-159', name: 'Env. Science & Sustainability Lab', short: 'ESS Lab', credits: 1 },
                    { code: 'SEC-143', name: 'Engg. Graphics & Design UI/UX', short: 'EG & UI/UX', credits: 3 }
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
                },
                electiveMode: 'track'
            }
        },
        'ETC': {
            1: {
                common: [
                    { code: 'ETC-100', name: 'Elements of Elec & Elec Engg', short: 'Elements EEE', credits: 3 },
                    { code: 'ETC-101', name: 'Elements of Elec & Elec Engg Lab', short: 'Elements Lab', credits: 1 },
                    { code: 'SHM-132', name: 'Applied Physics', short: 'Physics', credits: 2 },
                    { code: 'SHM-133', name: 'Applied Physics Lab', short: 'Phy Lab', credits: 1 },
                    { code: 'AEC-153', name: 'Comm. & Technical Writing', short: 'CTW', credits: 3 },
                    { code: 'VAC-158', name: 'Env. Science & Sustainability', short: 'ESS', credits: 2 },
                    { code: 'VAC-159', name: 'Env. Science & Sustainability Lab', short: 'ESS Lab', credits: 1 },
                    { code: 'SEC-143', name: 'Engg. Graphics & Design UI/UX', short: 'EG & UI/UX', credits: 3 }
                ],
                electives: {
                    'Mech/Civil': [
                        { code: 'MCV-111', name: 'Basics of Mech & Civil Engg', short: 'Mech/Civil', credits: 3 },
                        { code: 'MCV-112', name: 'Basics of Mech & Civil Engg Lab', short: 'M/C Lab', credits: 1 }
                    ],
                    'Biology': [
                        { code: 'SHM-111', name: 'Biology for Engineers', short: 'Bio', credits: 3 },
                        { code: 'SHM-112', name: 'Biology for Engineers Lab', short: 'Bio Lab', credits: 1 }
                    ]
                },
                electiveMode: 'track'
            },
            2: {
                common: [
                    { code: 'ETC-102', name: 'Fund. of Communication Engg', short: 'Comm Engg', credits: 3 },
                    { code: 'ETC-103', name: 'Fund. of Communication Engg Lab', short: 'Comm Lab', credits: 1 },
                    { code: 'SHM-131', name: 'Engineering Mathematics-I', short: 'Math-I', credits: 3 },
                    { code: 'AEC-151', name: 'Creative Thinking & Innovation', short: 'CTI', credits: 2 },
                    { code: 'AEC-152', name: 'Creative Thinking & Innovation Lab', short: 'CTI Lab', credits: 1 },
                    { code: 'VAC-156', name: 'Indian Knowledge System', short: 'IKS', credits: 2 },
                    { code: 'VAC-157', name: 'Indian Knowledge System Lab', short: 'IKS Lab', credits: 1 },
                    { code: 'SEC-144', name: 'Electronics & Mechanical Workshop', short: 'Workshop', credits: 3 }
                ],
                electives: {
                    'Computing': [
                        { code: 'ITH-111', name: 'Basics of Computing (Python)', short: 'Python', credits: 3 },
                        { code: 'ITH-112', name: 'Basics of Computing Lab', short: 'Python Lab', credits: 1 }
                    ],
                    'Chemistry': [
                        { code: 'SHM-113', name: 'Engineering Chemistry', short: 'Chem', credits: 3 },
                        { code: 'SHM-114', name: 'Engineering Chemistry Lab', short: 'Chem Lab', credits: 1 }
                    ]
                },
                electiveMode: 'track'
            }
        },
        'IT': {
            1: {
                common: [
                    { code: 'CMP-100', name: 'Fund. of Programming (C)', short: 'FOP', credits: 3 },
                    { code: 'CMP-101', name: 'Fund. of Programming Lab', short: 'FOP Lab', credits: 1 },
                    { code: 'SHM-131', name: 'Engineering Mathematics-I', short: 'Math-I', credits: 3 },
                    { code: 'AEC-151', name: 'Creative Thinking & Innovation', short: 'CTI', credits: 2 },
                    { code: 'AEC-152', name: 'Creative Thinking & Innovation Lab', short: 'CTI Lab', credits: 1 },
                    { code: 'VAC-156', name: 'Indian Knowledge System', short: 'IKS', credits: 2 },
                    { code: 'VAC-157', name: 'Indian Knowledge System Lab', short: 'IKS Lab', credits: 1 },
                    { code: 'SEC-144', name: 'Electronics & Mechanical Workshop', short: 'Workshop', credits: 3 }
                ],
                electives: {
                    'Electrical': [
                        { code: 'EEL-111', name: 'Basics of Elec & Elec Engg', short: 'BEEE', credits: 3 },
                        { code: 'EEL-112', name: 'Basics of Elec & Elec Engg Lab', short: 'BEEE Lab', credits: 1 }
                    ],
                    'Biology': [
                        { code: 'SHM-111', name: 'Biology for Engineers', short: 'Bio', credits: 3 },
                        { code: 'SHM-112', name: 'Biology for Engineers Lab', short: 'Bio Lab', credits: 1 }
                    ]
                },
                electiveMode: 'track'
            },
            2: {
                common: [
                    { code: 'ITH-100', name: 'Fund. of Computing (Python)', short: 'Python', credits: 3 },
                    { code: 'ITH-101', name: 'Fund. of Computing Lab', short: 'Python Lab', credits: 1 },
                    { code: 'SHM-132', name: 'Applied Physics', short: 'Physics', credits: 2 },
                    { code: 'SHM-133', name: 'Applied Physics Lab', short: 'Phy Lab', credits: 1 },
                    { code: 'AEC-153', name: 'Comm. & Technical Writing', short: 'CTW', credits: 3 },
                    { code: 'VAC-158', name: 'Env. Science & Sustainability', short: 'ESS', credits: 2 },
                    { code: 'VAC-159', name: 'Env. Science & Sustainability Lab', short: 'ESS Lab', credits: 1 },
                    { code: 'SEC-143', name: 'Engg. Graphics & Design UI/UX', short: 'EG & UI/UX', credits: 3 }
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
                },
                electiveMode: 'track'
            }
        },
        'VLSI': {
            1: {
                common: [
                    { code: 'ETC-100', name: 'Elements of Elec & Elec Engg', short: 'Elements EEE', credits: 3 },
                    { code: 'ETC-101', name: 'Elements of Elec & Elec Engg Lab', short: 'Elements Lab', credits: 1 },
                    { code: 'MCV-111', name: 'Basics of Mech & Civil Engg', short: 'Mech/Civil', credits: 3 },
                    { code: 'MCV-112', name: 'Basics of Mech & Civil Engg Lab', short: 'M/C Lab', credits: 1 },
                    { code: 'SHM-131', name: 'Engineering Mathematics-I', short: 'Math-I', credits: 3 },
                    { code: 'AEC-151', name: 'Creative Thinking & Innovation', short: 'CTI', credits: 2 },
                    { code: 'AEC-152', name: 'Creative Thinking & Innovation Lab', short: 'CTI Lab', credits: 1 },
                    { code: 'VAC-156', name: 'Indian Knowledge System', short: 'IKS', credits: 2 },
                    { code: 'VAC-157', name: 'Indian Knowledge System Lab', short: 'IKS Lab', credits: 1 },
                    { code: 'SEC-144', name: 'Electronics & Mechanical Workshop', short: 'Workshop', credits: 3 }
                ],
                electives: {
                  'Biology': [
                     { code: 'SHM-111', name: 'Biology for Engineers', short: 'Bio', credits: 3 },
                     { code: 'SHM-112', name: 'Biology for Engineers Lab', short: 'Bio Lab', credits: 1 }
                  ]
                },
                electiveMode: 'track'
            },
            2: {
                 common: [
                    { code: 'VLI-100', name: 'Fundamentals of VLSI', short: 'VLSI', credits: 3 },
                    { code: 'VLI-101', name: 'Fundamentals of VLSI Lab', short: 'VLSI Lab', credits: 1 },
                    { code: 'SHM-132', name: 'Applied Physics', short: 'Physics', credits: 2 },
                    { code: 'SHM-133', name: 'Applied Physics Lab', short: 'Phy Lab', credits: 1 },
                    { code: 'AEC-153', name: 'Comm. & Technical Writing', short: 'CTW', credits: 3 },
                    { code: 'VAC-158', name: 'Env. Science & Sustainability', short: 'ESS', credits: 2 },
                    { code: 'VAC-159', name: 'Env. Science & Sustainability Lab', short: 'ESS Lab', credits: 1 },
                    { code: 'SEC-143', name: 'Engg. Graphics & Design UI/UX', short: 'EG & UI/UX', credits: 3 }
                ],
                electives: {
                     'Computing': [
                        { code: 'ITH-111', name: 'Basics of Computing (Python)', short: 'Python', credits: 3 },
                        { code: 'ITH-112', name: 'Basics of Computing Lab', short: 'Python Lab', credits: 1 }
                     ],
                     'Chemistry': [
                        { code: 'SHM-113', name: 'Engineering Chemistry', short: 'Chem', credits: 3 },
                        { code: 'SHM-114', name: 'Engineering Chemistry Lab', short: 'Chem Lab', credits: 1 }
                     ]
                },
                electiveMode: 'track'
            }
        },
        'MECH': {
            1: {
                common: [
                    { code: 'MEC-100', name: 'Fund. of Mechanical Engg', short: 'FME', credits: 3 },
                    { code: 'MEC-101', name: 'Fund. of Mechanical Engg Lab', short: 'FME Lab', credits: 1 },
                    { code: 'SHM-132', name: 'Applied Physics', short: 'Physics', credits: 2 },
                    { code: 'SHM-133', name: 'Applied Physics Lab', short: 'Phy Lab', credits: 1 },
                    { code: 'AEC-153', name: 'Comm. & Technical Writing', short: 'CTW', credits: 3 },
                    { code: 'VAC-158', name: 'Env. Science & Sustainability', short: 'ESS', credits: 2 },
                    { code: 'VAC-159', name: 'Env. Science & Sustainability Lab', short: 'ESS Lab', credits: 1 },
                    { code: 'SEC-145', name: 'Engg. Drawing & Design Project', short: 'EDDP', credits: 3 }
                ],
                electives: {
                    'Civil': [
                        { code: 'CIV-111', name: 'Basics of Civil Engg', short: 'Civil', credits: 3 },
                        { code: 'CIV-112', name: 'Basics of Civil Engg Lab', short: 'Civil Lab', credits: 1 }
                    ],
                    'Biology': [
                        { code: 'SHM-111', name: 'Biology for Engineers', short: 'Bio', credits: 3 },
                        { code: 'SHM-112', name: 'Biology for Engineers Lab', short: 'Bio Lab', credits: 1 }
                    ]
                },
                electiveMode: 'track'
            },
            2: {
                common: [
                    { code: 'EEL-100', name: 'Fund. of Elec & Elec Engg', short: 'FEEE', credits: 3 },
                    { code: 'EEL-101', name: 'Fund. of Elec & Elec Engg Lab', short: 'FEEE Lab', credits: 1 },
                    { code: 'SHM-134', name: 'Applied Mathematics-I', short: 'Math-I', credits: 3 },
                    { code: 'AEC-151', name: 'Creative Thinking & Innovation', short: 'CTI', credits: 2 },
                    { code: 'AEC-152', name: 'Creative Thinking & Innovation Lab', short: 'CTI Lab', credits: 1 },
                    { code: 'VAC-156', name: 'Indian Knowledge System', short: 'IKS', credits: 2 },
                    { code: 'VAC-157', name: 'Indian Knowledge System Lab', short: 'IKS Lab', credits: 1 },
                    { code: 'SEC-141', name: 'Civil & Mechanical Workshop', short: 'Workshop', credits: 3 }
                ],
                electives: {
                    'Computing': [
                        { code: 'ITH-111', name: 'Basics of Computing (Python)', short: 'Python', credits: 3 },
                        { code: 'ITH-112', name: 'Basics of Computing Lab', short: 'Python Lab', credits: 1 }
                    ],
                    'Chemistry': [
                        { code: 'SHM-113', name: 'Engineering Chemistry', short: 'Chem', credits: 3 },
                        { code: 'SHM-114', name: 'Engineering Chemistry Lab', short: 'Chem Lab', credits: 1 }
                    ]
                },
                electiveMode: 'track'
            }
        },
        'CIVIL': {
            1: {
                common: [
                    { code: 'CIV-100', name: 'Fund. of Civil Engineering', short: 'FCE', credits: 3 },
                    { code: 'CIV-101', name: 'Fund. of Civil Engineering Lab', short: 'FCE Lab', credits: 1 },
                    { code: 'SHM-131', name: 'Engineering Mathematics-I', short: 'Math-I', credits: 3 },
                    { code: 'AEC-151', name: 'Creative Thinking & Innovation', short: 'CTI', credits: 2 },
                    { code: 'AEC-152', name: 'Creative Thinking & Innovation Lab', short: 'CTI Lab', credits: 1 },
                    { code: 'VAC-156', name: 'Indian Knowledge System', short: 'IKS', credits: 2 },
                    { code: 'VAC-157', name: 'Indian Knowledge System Lab', short: 'IKS Lab', credits: 1 },
                    { code: 'SEC-141', name: 'Civil & Mechanical Workshop', short: 'Workshop', credits: 3 }
                ],
                electives: {
                  'Electrical': [
                     { code: 'EEL-111', name: 'Basics of Elec & Elec Engg', short: 'BEEE', credits: 3 },
                     { code: 'EEL-112', name: 'Basics of Elec & Elec Engg Lab', short: 'BEEE Lab', credits: 1 }
                  ],
                  'Biology': [
                     { code: 'SHM-111', name: 'Biology for Engineers', short: 'Bio', credits: 3 },
                     { code: 'SHM-112', name: 'Biology for Engineers Lab', short: 'Bio Lab', credits: 1 }
                  ]
                },
                electiveMode: 'track'
            },
            2: {
                 common: [
                    { code: 'MEC-100', name: 'Fund. of Mechanical Engg', short: 'FME', credits: 3 },
                    { code: 'MEC-101', name: 'Fund. of Mechanical Engg Lab', short: 'FME Lab', credits: 1 },
                    { code: 'SHM-132', name: 'Applied Physics', short: 'Physics', credits: 2 },
                    { code: 'SHM-133', name: 'Applied Physics Lab', short: 'Phy Lab', credits: 1 },
                    { code: 'AEC-153', name: 'Comm. & Technical Writing', short: 'CTW', credits: 3 },
                    { code: 'VAC-158', name: 'Env. Science & Sustainability', short: 'ESS', credits: 2 },
                    { code: 'VAC-159', name: 'Env. Science & Sustainability Lab', short: 'ESS Lab', credits: 1 },
                    { code: 'SEC-142', name: 'Engg. Drawing & Modelling', short: 'EDM', credits: 3 }
                ],
                electives: {
                     'Computing': [
                        { code: 'ITH-111', name: 'Basics of Computing (Python)', short: 'Python', credits: 3 },
                        { code: 'ITH-112', name: 'Basics of Computing Lab', short: 'Python Lab', credits: 1 }
                     ],
                     'Chemistry': [
                        { code: 'SHM-113', name: 'Engineering Chemistry', short: 'Chem', credits: 3 },
                        { code: 'SHM-114', name: 'Engineering Chemistry Lab', short: 'Chem Lab', credits: 1 }
                     ]
                },
                electiveMode: 'track'
            }
        }
    },
    'RC2019-20': {
        'COMMON': {
            1: {
                common: [
                    { code: 'FE110', name: 'Mathematics-I', short: 'Math-I', credits: 4, max: 150 },
                    { code: 'FE120', name: 'Physics / Chemistry', short: 'Phy/Chem', credits: 3, max: 125 },
                    { code: 'FE130', name: 'Basic Electrical & Electronics Engg', short: 'BEEE', credits: 3, max: 125 },
                    { code: 'FE140', name: 'Basics of Mechanical Engg', short: 'Mech', credits: 3, max: 125 },
                    { code: 'FE150', name: 'Phy/Chem Laboratory', short: 'Lab 1', credits: 1, max: 25 },
                    { code: 'FE160', name: 'Electrical & Electronics Laboratory', short: 'Lab 2', credits: 1, max: 25 },
                    { code: 'FE170', name: 'Workshop-I', short: 'WS-I', credits: 1, max: 50 },
                    { code: 'AC180', name: 'Environmental Science', short: 'Env Sci', credits: 0, max: 0 } 
                ],
                electives: {},
                electiveMode: 'none'
            },
            2: {
                common: [
                    { code: 'FE210', name: 'Mathematics-II', short: 'Math-II', credits: 4, max: 150 },
                    { code: 'FE220', name: 'Chemistry / Physics', short: 'Chem/Phy', credits: 3, max: 125 },
                    { code: 'FE230', name: 'Computer Programming', short: 'Comp Prog', credits: 3, max: 125 },
                    { code: 'FE240', name: 'Intro to Civil Engineering', short: 'Civil', credits: 3, max: 125 },
                    { code: 'FE250', name: 'Chem/Phy Laboratory', short: 'Lab 1', credits: 1, max: 25 },
                    { code: 'FE260', name: 'Programming Laboratory', short: 'Prog Lab', credits: 1, max: 25 },
                    { code: 'FE270', name: 'Engineering Graphics', short: 'Graphics', credits: 2, max: 100 },
                    { code: 'FE280', name: 'Workshop-II', short: 'WS-II', credits: 1, max: 50 }
                ],
                electives: {},
                electiveMode: 'none'
            }
        },
        'COMP': {
            3: {
                common: [
                    { code: 'CE310', name: 'Mathematics III', short: 'Math-III', credits: 4, max: 150 },
                    { code: 'CE320', name: 'Logic Design', short: 'Logic Dsgn', credits: 3, max: 125 },
                    { code: 'CE330', name: 'Data Structures', short: 'DSA', credits: 3, max: 125 },
                    { code: 'CE340', name: 'Object Oriented Programming System', short: 'OOPS', credits: 3, max: 125 },
                    { code: 'CE350', name: 'Computer Organization', short: 'CO', credits: 4, max: 150 },
                    { code: 'CE360', name: 'Data Structures Programming Lab', short: 'DSA Lab', credits: 2, max: 75 },
                    { code: 'CE370', name: 'Object Oriented Programming System Lab', short: 'OOPS Lab', credits: 2, max: 75 },
                    { code: 'HM001', name: 'Technical Communication', short: 'Tech Comm', credits: 2, max: 75 },
                    { code: 'AC390', name: 'Mathematics I & II (Bridge Course)', short: 'Math Bridge', credits: 0, max: 0 }
                ],
                electives: {},
                electiveMode: 'none'
            },
            4: {
                common: [
                    { code: 'CE410', name: 'Discrete Mathematics', short: 'Discrete', credits: 4, max: 150 },
                    { code: 'CE420', name: 'Microprocessors & Microcontrollers', short: 'MPMC', credits: 3, max: 125 },
                    { code: 'CE430', name: 'Formal Languages & Automata Theory', short: 'FLAT', credits: 3, max: 125 },
                    { code: 'CE440', name: 'Modern Algorithm Design Foundation', short: 'Algo', credits: 3, max: 125 },
                    { code: 'CE450', name: 'Object Oriented Software Engineering', short: 'OOSE', credits: 4, max: 150 },
                    { code: 'CE460', name: 'Modern Algorithm Design Foundation Lab', short: 'Algo Lab', credits: 2, max: 75 },
                    { code: 'CE470', name: 'Microprocessors & Microcontrollers Lab', short: 'MPMC Lab', credits: 2, max: 75 },
                    { code: 'HM100', name: 'Economics for Engineers', short: 'Eco', credits: 3, max: 125 }
                ],
                electives: {},
                electiveMode: 'none'
            },
            5: {
                common: [
                    { code: 'CE510', name: 'Database Management & Query Processing', short: 'DBMS', credits: 3, max: 125 },
                    { code: 'CE520', name: 'Operating Systems', short: 'OS', credits: 3, max: 125 },
                    { code: 'CE550', name: 'Database Management & Query Processing Lab', short: 'DBMS Lab', credits: 2, max: 75 },
                    { code: 'CE560', name: 'Operating Systems Lab', short: 'OS Lab', credits: 2, max: 75 },
                    { code: 'HM300', name: 'Cyber Law and IPR', short: 'Cyber Law', credits: 3, max: 125 },
                    { code: 'OE', name: 'Open Elective', short: 'Open Elec', credits: 3, max: 125 }
                ],
                electives: {
                    'Professional Elective I': [
                        { code: 'CE531', name: 'Graph Theory', short: 'Graph', credits: 3, max: 125 },
                        { code: 'CE532', name: 'Neural Networks', short: 'Neural', credits: 3, max: 125 },
                        { code: 'CE533', name: 'Object Oriented Programming using JAVA', short: 'Java', credits: 3, max: 125 },
                        { code: 'CE534', name: 'Distributed Operating Systems', short: 'Dist OS', credits: 3, max: 125 }
                    ],
                    'Professional Elective II': [
                        { code: 'CE541', name: 'Modern Computer Graphics', short: 'Graphics', credits: 3, max: 125 },
                        { code: 'CE542', name: 'Web-Technologies', short: 'Web Tech', credits: 3, max: 125 },
                        { code: 'CE543', name: 'Testing & Quality Assurance', short: 'Testing', credits: 3, max: 125 },
                        { code: 'CE544', name: 'Real Time Systems', short: 'RTS', credits: 3, max: 125 }
                    ]
                },
                electiveMode: 'slot'
            },
            6: {
                common: [
                    { code: 'CE610', name: 'Modern Computer Networking', short: 'Networks', credits: 4, max: 150 },
                    { code: 'CE620', name: 'Artificial Intelligence', short: 'AI', credits: 4, max: 150 },
                    { code: 'CE650', name: 'Computer Networks Lab', short: 'CN Lab', credits: 1, max: 50 },
                    { code: 'CE660', name: 'Artificial Intelligence Lab', short: 'AI Lab', credits: 1, max: 50 },
                    { code: 'HM200', name: 'Technical Writing & Professional Ethics', short: 'Ethics', credits: 3, max: 125 },
                    { code: 'OE', name: 'Open Elective', short: 'Open Elec', credits: 3, max: 125 }
                ],
                electives: {
                    'Professional Elective III': [
                        { code: 'CE631', name: 'Computational Number Theory', short: 'Num Theory', credits: 3, max: 125 },
                        { code: 'CE632', name: 'Advanced Computer Organization & Architecture', short: 'Adv Arch', credits: 3, max: 125 },
                        { code: 'CE633', name: 'Speech & Natural Language Processing', short: 'NLP', credits: 3, max: 125 },
                        { code: 'CE634', name: 'Data Mining & Data Warehousing', short: 'DataMine', credits: 3, max: 125 }
                    ],
                    'Professional Elective IV': [
                        { code: 'CE641', name: 'High Performance Computing', short: 'HPC', credits: 3, max: 125 },
                        { code: 'CE642', name: 'Information Retrieval', short: 'IR', credits: 3, max: 125 },
                        { code: 'CE643', name: 'Image Processing & Vision', short: 'Img Proc', credits: 3, max: 125 },
                        { code: 'CE644', name: 'Cloud Computing & Applications', short: 'Cloud', credits: 3, max: 125 }
                    ]
                },
                electiveMode: 'slot'
            },
            7: {
                common: [
                    { code: 'CE710', name: 'Compiler Design', short: 'Compiler', credits: 4, max: 150 },
                    { code: 'CE730', name: 'Compiler Design Lab', short: 'Comp Lab', credits: 1, max: 50 },
                    { code: 'CE740', name: 'Internship', short: 'Internship', credits: 3, max: 100 },
                    { code: 'CE750', name: 'Project Work - Phase I', short: 'Proj-I', credits: 3, max: 125 },
                    { code: 'OE', name: 'Open Elective', short: 'Open Elec', credits: 3, max: 125 }
                ],
                electives: {
                    'Professional Elective V': [
                        { code: 'CE721', name: 'Embedded Systems & Design', short: 'Embed', credits: 3, max: 125 },
                        { code: 'CE722', name: 'Machine Learning', short: 'ML', credits: 3, max: 125 },
                        { code: 'CE723', name: 'Data Analytics', short: 'Analytics', credits: 3, max: 125 },
                        { code: 'CE724', name: 'Mobile Computing & Android Programming', short: 'Android', credits: 3, max: 125 }
                    ]
                },
                electiveMode: 'slot'
            }
        },
        'ENE': {
            3: {
                common: [
                    { code: 'EE310', name: 'Mathematics-III', short: 'Math-III', credits: 4, max: 150 },
                    { code: 'EE320', name: 'Electromagnetic Fields', short: 'EM Fields', credits: 3, max: 125 },
                    { code: 'EE330', name: 'Digital Electronics', short: 'Dig Elec', credits: 4, max: 125 },
                    { code: 'EE340', name: 'Electrical Machines - I', short: 'EM-I', credits: 4, max: 125 },
                    { code: 'EE350', name: 'Electrical Circuit Analysis', short: 'Circuits', credits: 4, max: 150 },
                    { code: 'EE360', name: 'Digital Electronics Lab', short: 'DE Lab', credits: 1, max: 75 },
                    { code: 'EE370', name: 'Electrical Machines-I Lab', short: 'EM-I Lab', credits: 1, max: 75 },
                    { code: 'HM001', name: 'Technical Communication', short: 'Tech Comm', credits: 2, max: 75 },
                    { code: 'AC390', name: 'Mathematics-I & II (Bridge)', short: 'Math Bridge', credits: 0, max: 0 }
                ],
                electives: {},
                electiveMode: 'none'
            },
            4: {
                common: [
                    { code: 'EE410', name: 'Numerical Methods', short: 'Num Meth', credits: 4, max: 150 },
                    { code: 'EE420', name: 'Electrical Machines - II', short: 'EM-II', credits: 4, max: 125 },
                    { code: 'EE430', name: 'Analog Electronics', short: 'Analog', credits: 4, max: 125 },
                    { code: 'EE440', name: 'Funda. of Signal Processing', short: 'FSP', credits: 4, max: 150 },
                    { code: 'EE450', name: 'Renewable Energy', short: 'Renewable', credits: 3, max: 125 },
                    { code: 'EE460', name: 'Electrical Machines - II Lab', short: 'EM-II Lab', credits: 1, max: 75 },
                    { code: 'EE470', name: 'Analog Electronics Lab', short: 'Analog Lab', credits: 1, max: 75 },
                    { code: 'HM003', name: 'Economics for Engineers', short: 'Eco', credits: 3, max: 125 }
                ],
                electives: {},
                electiveMode: 'none'
            },
            5: {
                common: [
                    { code: 'EE510', name: 'Control Systems', short: 'CS', credits: 4, max: 125 },
                    { code: 'EE520', name: 'Microprocessors & Micro', short: 'MPMC', credits: 4, max: 125 },
                    { code: 'EE550', name: 'Control Systems Lab', short: 'CS Lab', credits: 1, max: 75 },
                    { code: 'EE560', name: 'MPMC Lab', short: 'MPMC Lab', credits: 1, max: 75 },
                    { code: 'HM004', name: 'Entrepreneurship & IP', short: 'Entrep', credits: 3, max: 125 },
                    { code: 'OE', name: 'Open Elective', short: 'Open Elec', credits: 3, max: 125 } 
                ],
                electives: {
                    'Professional Elective I': [
                        { code: 'EE531', name: 'Digital Signal Processing', short: 'DSP', credits: 3, max: 125 },
                        { code: 'EE532', name: 'Illumination Engineering', short: 'Illum', credits: 3, max: 125 },
                        { code: 'EE533', name: 'Electrical Machines Design', short: 'Mac Dsgn', credits: 3, max: 125 },
                        { code: 'EE534', name: 'Electric Drives', short: 'Drives', credits: 3, max: 125 }
                    ],
                    'Professional Elective II': [
                        { code: 'EE541', name: 'Testing & Maint. of Elec M/C', short: 'Maint', credits: 3, max: 125 },
                        { code: 'EE542', name: 'Analog & Dig Comm', short: 'Comm', credits: 3, max: 125 },
                        { code: 'EE543', name: 'Bio-Medical Instru', short: 'BioMed', credits: 3, max: 125 },
                        { code: 'EE544', name: 'Operation Research', short: 'OR', credits: 3, max: 125 }
                    ]
                },
                electiveMode: 'slot'
            },
            6: {
                common: [
                    { code: 'EE610', name: 'Power System – I', short: 'PS-I', credits: 4, max: 150 },
                    { code: 'EE620', name: 'Power Electronics', short: 'PE', credits: 4, max: 125 },
                    { code: 'EE650', name: 'Elec & Elec Engg Lab', short: 'EEE Lab', credits: 1, max: 50 },
                    { code: 'EE660', name: 'Power Electronics Lab', short: 'PE Lab', credits: 1, max: 75 },
                    { code: 'HM005', name: 'Mgmt & Org Behavior', short: 'Mgmt', credits: 3, max: 125 },
                    { code: 'OE', name: 'Open Elective', short: 'Open Elec', credits: 3, max: 125 }
                ],
                electives: {
                    'Professional Elective III': [
                        { code: 'EE631', name: 'Dist. Gen & Microgrid', short: 'Microgrid', credits: 3, max: 125 },
                        { code: 'EE632', name: 'Power Quality', short: 'Pwr Qual', credits: 3, max: 125 },
                        { code: 'EE633', name: 'Digital Control System', short: 'DCS', credits: 3, max: 125 },
                        { code: 'EE634', name: 'ANN & Fuzzy Logic', short: 'ANN', credits: 3, max: 125 }
                    ],
                    'Professional Elective IV': [
                        { code: 'EE641', name: 'Power System Protection', short: 'Protect', credits: 3, max: 125 },
                        { code: 'EE642', name: 'VLSI Circuit Design', short: 'VLSI', credits: 3, max: 125 },
                        { code: 'EE643', name: 'Hybrid Vehicles', short: 'Hybrid', credits: 3, max: 125 },
                        { code: 'EE644', name: 'Conservation & Auditing', short: 'Audit', credits: 3, max: 125 }
                    ]
                },
                electiveMode: 'slot'
            },
            7: {
                common: [
                    { code: 'EE710', name: 'Power Systems - II', short: 'PS-II', credits: 4, max: 150 },
                    { code: 'EE730', name: 'Power System Lab', short: 'PS Lab', credits: 1, max: 50 },
                    { code: 'EE740', name: 'Internship', short: 'Internship', credits: 3, max: 100 },
                    { code: 'EE750', name: 'Project Work - Phase I', short: 'Proj-I', credits: 3, max: 125 },
                    { code: 'OE', name: 'Open Elective', short: 'Open Elec', credits: 3, max: 125 }
                ],
                electives: {
                     'Professional Elective V': [
                        { code: 'EE721', name: 'Flexible AC Trans. Sys', short: 'FACTS', credits: 3, max: 125 },
                        { code: 'EE722', name: 'Image Processing', short: 'Img Proc', credits: 3, max: 125 },
                        { code: 'EE723', name: 'Smart Grid', short: 'SmartGrid', credits: 3, max: 125 },
                        { code: 'EE724', name: 'PLC & Its Applications', short: 'PLC', credits: 3, max: 125 }
                    ]
                },
                electiveMode: 'slot'
            },
            8: {
                 common: [
                    { code: 'EE810', name: 'High Voltage Engineering', short: 'HV Engg', credits: 3, max: 125 },
                    { code: 'EE840', name: 'Project Work - Phase II', short: 'Proj-II', credits: 9, max: 400 }
                ],
                electives: {
                     'Professional Elective VI': [
                        { code: 'EE821', name: 'Embedded Systems', short: 'Embed', credits: 3, max: 125 },
                        { code: 'EE822', name: 'Power Sys. Op & Control', short: 'PSOC', credits: 3, max: 125 },
                        { code: 'EE823', name: 'Reliability of Elec. Sys', short: 'Reliab', credits: 3, max: 125 },
                        { code: 'EE824', name: 'PV & Its Applications', short: 'PV', credits: 3, max: 125 }
                    ],
                    'Elective - NPTEL/MOOC': [
                         { code: 'EE830', name: 'NPTEL / MOOC / SWAYAM', short: 'MOOC', credits: 3, max: 100 }
                    ]
                },
                electiveMode: 'slot'
            }
        }
    }
};

const BRANCHES = {
    'COMP': 'Computer Engineering',
    'IT': 'Information Technology',
    'ETC': 'Electronics & Telecom',
    'ENE': 'Electronics & Electrical',
    'MECH': 'Mechanical Engineering',
    'CIVIL': 'Civil Engineering',
    'VLSI': 'VLSI'
};
