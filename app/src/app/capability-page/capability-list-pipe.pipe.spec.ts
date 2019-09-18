import { CapabilityListPipePipe } from './capability-list-pipe.pipe';

describe('CapabilityListPipePipe', () => {
  let caplistPipe: CapabilityListPipePipe;
  const items = [];


  // synchronous beforeEach
  beforeEach(() => {
    caplistPipe = new CapabilityListPipePipe();
  });

  it('create an instance', () => {
    const pipe = new CapabilityListPipePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return empty array if no items given', () => {
    const items = null;

    const filtered = caplistPipe.transform(items, "anything", "");
    expect(filtered.length).toBe(0);
    expect(filtered).toEqual([]);
  });

  it('should return items if no field is given', () => {
    const items = [];
    items.push({
      capabilityID: 3,
      capabilityName: "Salesperson",
      jobFamilyID: 2,
      jobFamilyName: "Sales"
    },
    )
    const filtered = caplistPipe.transform(items, "", null);
    expect(filtered).toEqual(items);
  });

  it('should filter searchbar correctly', () => {
    const items = [];

    items.push(
      {
        capabilityID: 3,
        capabilityName: "Salesperson",
        jobFamilyID: 1,
        jobFamilyName: "Sales"
      },
      {
        capabilityID: 1,
        capabilityName: "Designer",
        jobFamilyID: 2,
        jobFamilyName: "Design"
      },
      {
        capabilityID: 2,
        capabilityName: "UX",
        jobFamilyID: 2,
        jobFamilyName: "Design"
      },
      {
        capabilityID: 3,
        capabilityName: "Marketing",
        jobFamilyID: 1,
        jobFamilyName: "Sales"
      });

    const filtered = caplistPipe.transform(items, 'Salesperson', null);
    expect(filtered.length).toBe(1);
  })

  it('should filter family-drpdwn correctly', () => {
    const items = [];

    items.push(
      {
        capabilityID: 3,
        capabilityName: "Salesperson",
        jobFamilyID: 1,
        jobFamilyName: "Sales"
      },
      {
        capabilityID: 1,
        capabilityName: "Designer",
        jobFamilyID: 2,
        jobFamilyName: "Design"
      },
      {
        capabilityID: 2,
        capabilityName: "UX",
        jobFamilyID: 2,
        jobFamilyName: "Design"
      },
      {
        capabilityID: 3,
        capabilityName: "Marketing",
        jobFamilyID: 1,
        jobFamilyName: "Sales"
      });

    const filtered = caplistPipe.transform(items, '', "1");
    expect(filtered.length).toBe(2);
  })

  it('should filter drpdowns and searchbar correctly', () => {
    const items = [];

    items.push(
      {
        capabilityID: 3,
        capabilityName: "Salesperson",
        jobFamilyID: 1,
        jobFamilyName: "Sales"
      },
      {
        capabilityID: 1,
        capabilityName: "Designer",
        jobFamilyID: 2,
        jobFamilyName: "Design"
      },
      {
        capabilityID: 2,
        capabilityName: "UX",
        jobFamilyID: 2,
        jobFamilyName: "Design"
      },
      {
        capabilityID: 3,
        capabilityName: "Marketing",
        jobFamilyID: 1,
        jobFamilyName: "Sales"
      });

    const filtered = caplistPipe.transform(items, "Marketing", "1");
    expect(filtered).toEqual([items[3]]);
  })
});