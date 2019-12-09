package com.hysoft.assets.domain.publicRecords;

import com.hysoft.commonp.util.BaseEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "recordContractRelevance")
public class RecordContractRelevance extends BaseEntity {

    /**
     * 合同id
     */
    @Column(length = 32)
    private String contractId;

    /**
     * 附件id
     */
    @Column(length = 32)
    private String fileIds;

    public String getContractId() {
        return contractId;
    }

    public void setContractId(String contractId) {
        this.contractId = contractId;
    }

    public String getFileIds() {
        return fileIds;
    }

    public void setFileIds(String fileIds) {
        this.fileIds = fileIds;
    }
}
