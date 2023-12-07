namespace server.Models;

public class ProformaEnAttente {
    public VProformaSend? vProformaSend {get;set;}

    public List<VProformaSendNeedGroup>? vProformaSendNeedGroups {get;set;}
}