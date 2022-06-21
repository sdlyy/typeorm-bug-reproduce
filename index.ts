import {
  DataSource,
  Entity,
  PrimaryGeneratedColumn,
  Repository,
} from "typeorm";

const dummyDs = new DataSource({ type: "postgres" });

@Entity()
class BuggyEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  // when defined there is ERROR in any find call, below
  public toString() {
    return JSON.stringify(this);
  }

  public anotherMethod() {
    return true;
  }
}

@Entity()
class JustFineEntity {
  @PrimaryGeneratedColumn()
  public id!: number;
}

const buggyRepo = new Repository(BuggyEntity, dummyDs.manager);
const justFineRepo = new Repository(JustFineEntity, dummyDs.manager);

const pleaseWorkPsyDuck = async () => {
  const buggyEntity = await buggyRepo.findOne({
    where: { id: 1 }, // <-
  });
  const justFineEntity = await justFineRepo.findOne({ where: { id: 1 } });
};
