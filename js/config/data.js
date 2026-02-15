const DATA = {
  ENE: {
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
        Computing: [
          { code: 'ITH-111', name: 'Basics of Computing (Python)', short: 'Python', credits: 3 },
          { code: 'ITH-112', name: 'Basics of Computing Lab', short: 'Python Lab', credits: 1 }
        ],
        Biology: [
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
        Chemistry: [
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
        { code: 'EEL-241', name: 'Electrical Workshop', short: 'Elec WS', credits: 3 }
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
        Utilization: [
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
  COMP: {
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
        Electrical: [
          { code: 'EEL-111', name: 'Basics of Elec & Elec Engg', short: 'BEEE', credits: 3 },
          { code: 'EEL-112', name: 'Basics of Elec & Elec Engg Lab', short: 'BEEE Lab', credits: 1 }
        ],
        Biology: [
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
        Chemistry: [
          { code: 'SHM-113', name: 'Engineering Chemistry', short: 'Chem', credits: 3 },
          { code: 'SHM-114', name: 'Engineering Chemistry Lab', short: 'Chem Lab', credits: 1 }
        ]
      },
      electiveMode: 'track'
    }
  },
  ETC: {
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
        Biology: [
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
        Computing: [
          { code: 'ITH-111', name: 'Basics of Computing (Python)', short: 'Python', credits: 3 },
          { code: 'ITH-112', name: 'Basics of Computing Lab', short: 'Python Lab', credits: 1 }
        ],
        Chemistry: [
          { code: 'SHM-113', name: 'Engineering Chemistry', short: 'Chem', credits: 3 },
          { code: 'SHM-114', name: 'Engineering Chemistry Lab', short: 'Chem Lab', credits: 1 }
        ]
      },
      electiveMode: 'track'
    }
  },
  IT: {
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
        Electrical: [
          { code: 'EEL-111', name: 'Basics of Elec & Elec Engg', short: 'BEEE', credits: 3 },
          { code: 'EEL-112', name: 'Basics of Elec & Elec Engg Lab', short: 'BEEE Lab', credits: 1 }
        ],
        Biology: [
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
        Chemistry: [
          { code: 'SHM-113', name: 'Engineering Chemistry', short: 'Chem', credits: 3 },
          { code: 'SHM-114', name: 'Engineering Chemistry Lab', short: 'Chem Lab', credits: 1 }
        ]
      },
      electiveMode: 'track'
    }
  },
  VLSI: {
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
        Biology: [
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
        Computing: [
          { code: 'ITH-111', name: 'Basics of Computing (Python)', short: 'Python', credits: 3 },
          { code: 'ITH-112', name: 'Basics of Computing Lab', short: 'Python Lab', credits: 1 }
        ],
        Chemistry: [
          { code: 'SHM-113', name: 'Engineering Chemistry', short: 'Chem', credits: 3 },
          { code: 'SHM-114', name: 'Engineering Chemistry Lab', short: 'Chem Lab', credits: 1 }
        ]
      },
      electiveMode: 'track'
    }
  },
  MECH: {
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
        Civil: [
          { code: 'CIV-111', name: 'Basics of Civil Engg', short: 'Civil', credits: 3 },
          { code: 'CIV-112', name: 'Basics of Civil Engg Lab', short: 'Civil Lab', credits: 1 }
        ],
        Biology: [
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
        Computing: [
          { code: 'ITH-111', name: 'Basics of Computing (Python)', short: 'Python', credits: 3 },
          { code: 'ITH-112', name: 'Basics of Computing Lab', short: 'Python Lab', credits: 1 }
        ],
        Chemistry: [
          { code: 'SHM-113', name: 'Engineering Chemistry', short: 'Chem', credits: 3 },
          { code: 'SHM-114', name: 'Engineering Chemistry Lab', short: 'Chem Lab', credits: 1 }
        ]
      },
      electiveMode: 'track'
    }
  },
  CIVIL: {
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
        Electrical: [
          { code: 'EEL-111', name: 'Basics of Elec & Elec Engg', short: 'BEEE', credits: 3 },
          { code: 'EEL-112', name: 'Basics of Elec & Elec Engg Lab', short: 'BEEE Lab', credits: 1 }
        ],
        Biology: [
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
        Computing: [
          { code: 'ITH-111', name: 'Basics of Computing (Python)', short: 'Python', credits: 3 },
          { code: 'ITH-112', name: 'Basics of Computing Lab', short: 'Python Lab', credits: 1 }
        ],
        Chemistry: [
          { code: 'SHM-113', name: 'Engineering Chemistry', short: 'Chem', credits: 3 },
          { code: 'SHM-114', name: 'Engineering Chemistry Lab', short: 'Chem Lab', credits: 1 }
        ]
      },
      electiveMode: 'track'
    }
  }
};

export { DATA };
