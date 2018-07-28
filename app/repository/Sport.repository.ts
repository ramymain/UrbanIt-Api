import { EntityRepository, Repository } from "typeorm";
import { Sport } from "../models/Sport.model";

@EntityRepository(Sport)
export class SportRepository extends Repository<Sport> {

    public findBySport(sport: string): Promise<Sport> {
        return this.manager.findOne(Sport, {where: {sport: sport}});
    }

}
