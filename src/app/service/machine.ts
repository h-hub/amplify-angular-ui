export class Machine {
    public mac: String;
    public connected: Boolean;
    public status: String

    machine(){
        this.mac="";
        this.connected=false;
        this.status="";
    }
}