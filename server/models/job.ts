import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export default class Job {

    // Default constructor is used to generate the property keys.
    // This probably shouldn't be used as it makes an invalid id.
    constructor() {
        this.id = null;
        this.job_title = null;
        this.link = null;
        this.description = null;
        this.city = null;
        this.country = null;
        this.latitude = null;
        this.longitude = null;
        this.company_name = null;
        this.start_date = null;
        this.salary_min = null;
    }

    @PrimaryGeneratedColumn({type: "bigint"})
    public id: number;

    @Column({ nullable: true, length: 256})
    public job_title: string;

    @Column({ nullable: true, type: "text"})
    public link: string;

    @Column({ nullable: true, type: "text"})
    public description: string;

    @Column({ nullable: true, length: 256})
    public city: string;

    @Column({ nullable: true, length: 256})
    public state: string;

    @Column({ nullable: true, length: 256})
    public country: string;

    @Column({ nullable: true, type: "double precision" })
    public latitude: number;

    @Column({ nullable: true, type: "double precision" })
    public longitude: number;

    @Column({ nullable: true, length: 256})
    public company_name: string;

    @Column({ nullable: true, type: "date" })
    public start_date: Date;

    @Column({ nullable: true, type: "integer"})
    public salary_min: number;
}
