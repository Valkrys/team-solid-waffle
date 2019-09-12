import { RolesFilterPipe } from './roles-filter.pipe';

describe('RolesFilterPipe', () => {
  let rolesfilterPipe: RolesFilterPipe;
  const items = [];


  // synchronous beforeEach
  beforeEach(() => {
    rolesfilterPipe = new RolesFilterPipe();
  });

  it('create an instance', () => {
    const pipe = new RolesFilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return empty array if no items given', () => {
    const items = null;

    const filtered = rolesfilterPipe.transform(items, "anything", "", "", "");
    expect(filtered.length).toBe(0);
    expect(filtered).toEqual([]);
  });

  it('should return items if no field is given', () => {
    const items = [];
    items.push({
      roleName: "Lead Salesperson",
      capabilityID: 3,
      capabilityName: "Sales",
      bandID: 4,
      bandName: "Lead",
      jobFamilyID: 2
    },
    )
    const filtered = rolesfilterPipe.transform(items, "", null, null, null);
    expect(filtered).toEqual(items);
  });

  it('should filter searchbar correctly', () => {
    const items = [];

    items.push(
      {
        roleName: "Lead Salesperson",
        capabilityID: 3,
        capabilityName: "Sales",
        bandID: 4,
        bandName: "Lead",
        jobFamilyID: 2
      },
      {
        roleName: "Trainee Designer",
        capabilityID: 1,
        capabilityName: "Design",
        bandID: 1,
        bandName: "Trainee",
        jobFamilyID: 1
      },
      {
        roleName: "Trainee UXDesigner",
        capabilityID: 2,
        capabilityName: "UX",
        bandID: 1,
        bandName: "Trainee",
        jobFamilyID: 1
      },
      {
        roleName: " Manager Salesperson",
        capabilityID: 3,
        capabilityName: "Sales",
        bandID: 3,
        bandName: "Manager",
        jobFamilyID: 2
      });

    const filtered = rolesfilterPipe.transform(items, 'Trainee', null, null, null);
    expect(filtered.length).toBe(2);
  })

  it('should filter family-drpdwn correctly', () => {
    const items = [];

    items.push(
      {
        roleName: "Lead Salesperson",
        capabilityID: 3,
        capabilityName: "Salesperson",
        bandID: 4,
        bandName: "Lead",
        jobFamilyID: 1,
        jobFamilyName: "Sales"
      },
      {
        roleName: "Trainee Designer",
        capabilityID: 1,
        capabilityName: "Designer",
        bandID: 1,
        bandName: "Trainee",
        jobFamilyID: 2,
        jobFamilyName: "Design"
      },
      {
        roleName: "Trainee UXDesigner",
        capabilityID: 2,
        capabilityName: "UX",
        bandID: 1,
        bandName: "Trainee",
        jobFamilyID: 2,
        jobFamilyName: "Design"
      },
      {
        roleName: " Manager Salesperson",
        capabilityID: 3,
        capabilityName: "Salesperson",
        bandID: 3,
        bandName: "Manager",
        jobFamilyID: 1,
        jobFamilyName: "Sales"
      });

    const filtered = rolesfilterPipe.transform(items, '', null, null, "1");
    expect(filtered.length).toBe(2);
  })

  it('should filter capability-drpdwn correctly', () => {
    const items = [];

    items.push(
      {
        roleName: "Lead Salesperson",
        capabilityID: 3,
        capabilityName: "Salesperson",
        bandID: 4,
        bandName: "Lead",
        jobFamilyID: 1,
        jobFamilyName: "Sales"
      },
      {
        roleName: "Trainee Designer",
        capabilityID: 1,
        capabilityName: "Designer",
        bandID: 1,
        bandName: "Trainee",
        jobFamilyID: 2,
        jobFamilyName: "Design"
      },
      {
        roleName: "Trainee UXDesigner",
        capabilityID: 2,
        capabilityName: "UX",
        bandID: 1,
        bandName: "Trainee",
        jobFamilyID: 2,
        jobFamilyName: "Design"
      },
      {
        roleName: " Manager Salesperson",
        capabilityID: 3,
        capabilityName: "Salesperson",
        bandID: 3,
        bandName: "Manager",
        jobFamilyID: 1,
        jobFamilyName: "Sales"
      });

    const filtered = rolesfilterPipe.transform(items, '', null, "3", null);
    expect(filtered.length).toBe(2);
  })

  it('should filter band-drpdwn correctly', () => {
    const items = [];

    items.push(
      {
        roleName: "Lead Salesperson",
        capabilityID: 3,
        capabilityName: "Salesperson",
        bandID: 4,
        bandName: "Lead",
        jobFamilyID: 1,
        jobFamilyName: "Sales"
      },
      {
        roleName: "Trainee Designer",
        capabilityID: 1,
        capabilityName: "Designer",
        bandID: 1,
        bandName: "Trainee",
        jobFamilyID: 2,
        jobFamilyName: "Design"
      },
      {
        roleName: "Trainee UXDesigner",
        capabilityID: 2,
        capabilityName: "UX",
        bandID: 1,
        bandName: "Trainee",
        jobFamilyID: 2,
        jobFamilyName: "Design"
      },
      {
        roleName: " Manager Salesperson",
        capabilityID: 3,
        capabilityName: "Salesperson",
        bandID: 3,
        bandName: "Manager",
        jobFamilyID: 1,
        jobFamilyName: "Sales"
      });

    const filtered = rolesfilterPipe.transform(items, '', "Manager", null, null);
    expect(filtered.length).toBe(1);
  })

  it('should filter drpdowns and searchbar correctly', () => {
    const items = [];

    items.push(
      {
        roleName: "Lead Salesperson",
        capabilityID: 3,
        capabilityName: "Salesperson",
        bandID: 4,
        bandName: "Lead",
        jobFamilyID: 1,
        jobFamilyName: "Sales"
      },
      {
        roleName: "Trainee Designer",
        capabilityID: 1,
        capabilityName: "Designer",
        bandID: 1,
        bandName: "Trainee",
        jobFamilyID: 2,
        jobFamilyName: "Design"
      },
      {
        roleName: "Trainee UXDesigner",
        capabilityID: 2,
        capabilityName: "UX",
        bandID: 1,
        bandName: "Trainee",
        jobFamilyID: 2,
        jobFamilyName: "Design"
      },
      {
        roleName: " Manager Salesperson",
        capabilityID: 3,
        capabilityName: "Salesperson",
        bandID: 3,
        bandName: "Manager",
        jobFamilyID: 1,
        jobFamilyName: "Sales"
      });

    const filtered = rolesfilterPipe.transform(items, 'Trainee', null, "2", null);
    expect(filtered).toEqual([items[2]]);
  })




});
